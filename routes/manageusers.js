const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const database = require('./func/database');
const jwt = require('jsonwebtoken');
let processR = process.env.use_recaptcha;
processR = processR === 'true';

router.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    if (!mail || !password) {
        return res.status(400).json({ status: false, message: 'Faltan datos' });
    }
    const unbase64 = Buffer.from(password, 'base64').toString('utf-8');
    const hashPasswd = crypto.createHash('md5').update(unbase64).digest('hex')
    const user = database.getDatabaseByUser(mail, true);
    console.log(hashPasswd);
    console.log(user);
    if (!user) {
        return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
    }
    if (user.hashPassword !== hashPasswd) {
        return res.status(401).json({ status: false, message: 'Contraseña incorrecta' });
    }
    if (!user.isVerified) {
        return res.status(401).json({ status: false, message: 'Usuario no verificado' });
    }

    const token = jwt.sign({ mail: mail, userid: user.userId }, process.env.JWT_SECRET || 'B3tterTh@nB');
    res.status(200).json({ status: true, token: token });

});

router.post('/register', async (req, res) => {
    const { mail, password, recaptchaVerify } = req.body;
    if (!mail || !password) {
        return res.status(400).json({ status: false, message: 'Faltan datos' });
    }

    if (processR && !recaptchaVerify) {
        return res.status(400).json({ status: false, message: 'Falta recaptcha' });
    }

    const user = database.getDatabaseByUser(mail);
    if (user) {
        return res.status(409).json({ status: false, message: 'Usuario ya registrado' });
    }
    if (processR) {
        const recaptcha = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.recaptcha_secret}&response=${recaptchaVerify}`, {
            method: 'POST'
        });
        const recaptchaJson = await recaptcha.json();
        if (!recaptchaJson.success) {
            return res.status(400).json({ status: false, message: 'Recaptcha inválido' });
        }
    }
    const unbase64 = Buffer.from(password, 'base64').toString('utf-8');
    const newUser = database.PostDatabase(mail, unbase64, !process.env.new_user_verification === 'true');
    if (process.env.new_user_verification === 'true') {
        // send mail
        try {
        console.log('Enviando correo a ' + mail);
        const info = await mTransporter.sendMail({
            from: process.env.smtp_user,
            to: mail,
            subject: "Verificacion",
            text: "Para utilizar nuestra api, Debes Verificar este correo electronico, Viendo el siguiente link: https://" + req.headers.host + "/api/manageusers/verify?token=" + newUser.verifyCode
          });
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ status: true, message: 'Usuario registrado, Para completar el registro, verifica tu correo, Si no ves el correo, revisa la carpeta de spam' });
        } catch (error) {
            console.log(error);
            database.DeleteDatabase(newUser.mail);
            return res.status(500).json({ status: false, message: 'Error al enviar el correo' });
        }
    }
    return res.status(200).json({ status: true, message: 'Usuario registrado' });
});

router.get('/user', async (req, res) => {
    let token = req.headers['authorization'];
    // remove Bearer from token
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: false, message: 'No se proporcionó un token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'B3tterTh@nB');
        const user = database.getDatabaseByUser(decoded.mail);
        if (!user) {
            return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ status: true, user: user, CurrentLimit: user.isPremium ? Number(process.env.premium_user_limit) : Number(process.env.free_user_limit) });
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Token inválido' });
    }
});

router.get('/fetchRecaptcha', async (req, res) => {
    if (!processR) {
        return res.status(404).json({ status: false, message: 'Recaptcha no habilitado' });
    }
    const recaptchaSiteKey = process.env.recaptcha_site_key;
    return res.status(200).json({ status: true, sitekey: recaptchaSiteKey });
})

router.get('/verify', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ status: false, message: 'Falta token' });
    }
    const user = database.getDatabaseByVerifyCode(token);
    if (!user) {
        return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
    }
    if (user.isVerified) {
        return res.status(400).json({ status: false, message: 'Usuario ya verificado' });
    }
    const updatedUser = database.UpdateDatabase(user.mail, { isVerified: true });
    return res.redirect("/login.html?verified=true");
})

router.post('/requestReset', async (req, res) => {
    const mail = req.body.mail;
    const recaptchaVerify = req.body.recaptchaVerify;
    if (!mail) {
        return res.status(400).json({ status: false, message: 'Falta mail' });
    }
    const user = database.getDatabaseByUser(mail);
    if (!user) {
        return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
    }

    if (processR && !recaptchaVerify) {
        return res.status(400).json({ status: false, message: 'Falta recaptcha' });
    }

    if (processR) {
        const recaptcha = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.recaptcha_secret}&response=${recaptchaVerify}`, {
            method: 'POST'
        });
        const recaptchaJson = await recaptcha.json();
        if (!recaptchaJson.success) {
            return res.status(400).json({ status: false, message: 'Recaptcha inválido' });
        }
    }

    const resetCode = crypto.randomBytes(20).toString('hex');
    const updatedUser = database.UpdateDatabase(user.mail, { resetCode: resetCode });
    try {
        const info = await mTransporter.sendMail({
            from: process.env.smtp_user,
            to: mail,
            subject: "Restablecer contraseña",
            text: "Para restablecer tu contraseña, ve al siguiente link: https://" + req.headers.host + "/api/manageusers/reset?token=" + resetCode
          });
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ status: true, message: 'Correo enviado' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: 'Error al enviar el correo' });
    }
})

router.get('/reset', async (req, res) => {
    const token = req.query.token;
    return res.redirect("/reset.html?resetToken=" + token);
})

router.post('/reset', async (req, res) => {
    const token = req.body.tokenReset;
    const password = req.body.password;
    if (!token || !password) {
        return res.status(400).json({ status: false, message: 'Faltan datos' });
    }
    const users = database.getDatabase()
    const user = users.find(user => user.resetCode === token);
    if (!user) {
        return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
    }
    const unbase64 = Buffer.from(password, 'base64').toString('utf-8');
    const updatedUser = database.UpdateDatabase(user.mail, { hashPassword: crypto.createHash('md5').update(unbase64).digest('hex'), resetCode: undefined });
    return res.status(200).json({ status: true, message: 'Contraseña restablecida' });
})


module.exports = router;
