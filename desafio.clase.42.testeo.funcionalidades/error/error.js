const { errorLogger } = require('../config/log4js')

function error(type, message, res) {
    errorLogger.error(message);
    res.status(400).json({errorType: type, errorMessage: message})
}

module.exports = {
    error,
}