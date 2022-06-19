const { errorLogger } = require('../config/config.log4js')

function errorResponse(status, type, message, res) {
    errorLogger.error(message);
    if (process.env.MODE === "api") {
        res.status(status).json({errorType: type, errorMessage: message});   
    } else {
        res.render('redireccion', {
            mensaje: message,
        })
    }
}

module.exports = {
    errorResponse,
}