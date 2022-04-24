const twilio = require('twilio');

const account = 'AC125d0467ea87fc4ce2d76c7c5052050a';
const token = 'c7be6ad350e7e911b772df198d751f31';

const client = twilio(account, token);

module.exports = client;