const { errorLogger } = require('../config/log4js')

function error(type, message, ctx) {
    errorLogger.error(message);
    ctx.response.status = 400;
    ctx.body = {errorType: type, errorMessage: message};
}

module.exports = {
    error,
}