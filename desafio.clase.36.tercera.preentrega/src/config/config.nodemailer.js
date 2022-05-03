const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASS_NODEMAILER
    }
});

module.exports = transporter;