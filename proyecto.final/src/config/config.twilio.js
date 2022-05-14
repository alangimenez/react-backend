const twilio = require('twilio');

const account = process.env.ACCOUNT_TWILIO;
const token = process.env.TOKEN_TWILIO;

const client = twilio(account, token);

module.exports = client;