const { errorLogger } = require('../config/config.log4js')

function errorResponse(status, type, message, res) {
    errorLogger.error(message);
    res.status(status).json({errorType: type, errorMessage: message})
}

module.exports = {
    errorResponse,
}