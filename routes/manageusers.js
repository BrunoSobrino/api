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
    //console.log(hashPasswd);
    //7console.log(user);
    if (!user) {
        return res.status(404).json({ status: false, message: '[❗] Usuario no encontrado, por favor registrese.' });
    }
    if (user.hashPassword !== hashPasswd) {
        return res.status(401).json({ status: false, message: '[❗] Contraseña incorrecta, recuerde que debe ser de 8 digitos o más.' });
    }
    if (!user.isVerified) {
        return res.status(401).json({ status: false, message: '[❗] Usuario no verificado, revise la bandeja de entrada o de spam de su correo.' });
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
        return res.status(409).json({ status: false, message: '[❗] Usuario ya registrado, verifique su correo e inicie sesión.' });
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
    const newUser = database.PostDatabase(mail, unbase64, !(process.env.new_user_verification === 'true'));
    if (process.env.new_user_verification === 'true') {
        // send mail
        try {
        //console.log('Enviando correo a ' + mail);
        const info = await mTransporter.sendMail({
            from: process.env.smtp_user,
            to: mail,
            subject: "Verificación de correo electrónico",
            html: `
                <html>
                <head>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #007bff;
                    text-align: center;
                }
                p {
                    margin-bottom: 20px;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: bold;
                }
                .signature {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                    text-align: center;
                }
                </style>
                </head>
                <body>
                <div class="container">
                <h1>Verificación de Correo Electrónico</h1>
                <p>Hola Usuario,</p>
                <p>Para completar tu registro y poder utilizar nuestros servicios de API, por favor haz clic en el siguiente enlace:</p>
                <p><a href="https://${req.headers.host}/api/manageusers/verify?token=${newUser.verifyCode}">Verificar Correo</a></p>
                <p>Si no has solicitado este correo, simplemente ignóralo.</p>
                <p>¡Gracias!</p>
                <div class="signature">
                <p><strong>The Shadow Brokers - TEAM</strong></p>
                <p><strong>Bruno Sobrino</strong></p>
                </div>
                </div>
                </body>
                </html>
                `
          });
        //console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ status: true, message: '[❗] Usuario registrado, para completar el registro, verifica tu correo, si no ves el correo revisa la carpeta de spam.' });
        } catch (error) {
            console.log(error);
            database.DeleteDatabase(newUser.mail);
            return res.status(500).json({ status: false, message: '[⚠️] Error al enviar el correo, reporte el error en Github.' });
        }
    }
    return res.status(200).json({ status: true, message: '[❗] Usuario registrado.' });
});

router.get('/user', async (req, res) => {
    let token = req.headers['authorization'];
    // remove Bearer from token
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: false, message: '[❗] No se proporcionó un token, haga click en el enlace que fue enviado a su correo.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'B3tterTh@nB');
        const user = database.getDatabaseByUser(decoded.mail);
        if (!user) {
            return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ status: true, user: user, CurrentLimit: user.isPremium ? Number(process.env.premium_user_limit) : Number(process.env.free_user_limit) });
    } catch (error) {
        return res.status(401).json({ status: false, message: '[❗] Token inválido, haga click en el enlace que fue enviado a su correo.' });
    }
});

router.get('/fetchRecaptcha', async (req, res) => {
    if (!processR) {
        return res.status(404).json({ status: false, message: '[❗] Recaptcha no habilitado.' });
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
        return res.status(404).json({ status: false, message: '[❗] Usuario no encontrado, por favor verifique que sea el correo correcto.' });
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
            html: `
            <html>
            <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            h1 {
                color: #007bff;
                text-align: center;
            }
            p {
                margin-bottom: 20px;
            }
            a {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
            .signature {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                padding-top: 10px;
                text-align: center;
            }
            </style>
            </head>
            <body>
            <div class="container">
            <h1>Restablecer Contraseña</h1>
            <p>Hola Usuario,</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
            <p><a href="https://${req.headers.host}/api/manageusers/reset?token=${resetCode}">Restablecer Contraseña</a></p>
            <p>Si no has solicitado restablecer tu contraseña, simplemente ignora este correo.</p>
            <p>¡Gracias!</p>
            <div class="signature">
            <p><strong>The Shadow Brokers - TEAM</strong></p>
            <p><strong>Bruno Sobrino</strong></p>
            </div>
            </div>
            </body>
            </html>
            `
        });
        //console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ status: true, message: '[❗] Correo enviado, verifique su bandeja de entradas o la carpeta de spam.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: '[⚠️] Error al enviar el correo, reporte en Github.' });
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
        return res.status(404).json({ status: false, message: '[❗] Usuario no encontrado, por favor registrese.' });
    }
    const unbase64 = Buffer.from(password, 'base64').toString('utf-8');
    const updatedUser = database.UpdateDatabase(user.mail, { hashPassword: crypto.createHash('md5').update(unbase64).digest('hex'), resetCode: undefined });
    return res.status(200).json({ status: true, message: '[❗] Contraseña restablecida.' });
})


module.exports = router;
