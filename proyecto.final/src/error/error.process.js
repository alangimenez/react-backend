const { errorLogger } = require('../config/log4js')

function errorProcess(metodo, message) {
    errorLogger.error(`Ocurrio un error en ${metodo} CRUD -> ` + message );
    throw new Error(`Ocurrio un error en ${metodo} CRUD -> ` + message)
}

module.exports = {
    errorProcess,
}