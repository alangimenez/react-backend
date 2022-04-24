const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'krista.leffler36@ethereal.email',
        pass: 'faYZ1xYe4vMCyQRYGj'
    }
});

module.exports = transporter;