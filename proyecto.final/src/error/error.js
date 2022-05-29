const { errorLogger } = require('../config/config.log4js');

class ErrorHandler {
    constructor() {}

    errorProcess(metodo, message) {
        try {
            errorLogger.error(`Ocurrio un error en ${metodo} CRUD -> ` + message );
            throw new Error(`Ocurrio un error en ${metodo} CRUD -> ` + message);    
        } catch (e) {
            errorLogger.error(`Ocurrio un error en el ErrorHandler -> ` + message );
            throw new Error(`Ocurrio un error en el ErrorHandler -> ` + message);  
        }
    }
    
    errorResponse(status, type, message, res) {
        try {
            errorLogger.error(message);
            res.status(status).json({errorType: type, errorMessage: message});   
        } catch (e) {
            errorLogger.error(`Ocurrio un error en el ErrorHandler -> ` + message );
            throw new Error(`Ocurrio un error en el ErrorHandler -> ` + message);
        }
    }
}

module.exports = {
    ErrorHandler,
}

