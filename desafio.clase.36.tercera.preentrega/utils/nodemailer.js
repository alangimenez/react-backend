const transporter = require('../config/config.nodemailer');

const mailOptions = {
    from: 'Node JS server',
    to: process.env.NODEMAILER,
    subject: 'Mi primer mail desde Node JS',
    html: '<h1>Bienvenido a mi primer mail desde NodeJS</h1>'
}

async function enviarMail  () {
    try {
        const mail = await transporter.sendMail(mailOptions);
        console.log(mail);
    } catch (error) {
        console.log(error)
    }
}

module.exports = enviarMail;