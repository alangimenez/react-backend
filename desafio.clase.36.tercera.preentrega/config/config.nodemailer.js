const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'j45bm2kt6f2nxl46@ethereal.email',
        pass: 'pkghUBZ9YefXvxz6dE'
    }
});

module.exports = transporter;