const { errorLogger } = require('../config/config.log4js');
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();

class AppMidd {
    constructor() { }

    // error si no existe ruta
    validarRuta(req, res, next) {
        return error.errorResponse(404, "middlewareError", `La ruta '${req.baseUrl}' con el metodo ${req.method} no existe.`, res);
    }

    // error por si esta mal seteado el modo de funcionamiento de la aplicación
    errorModo(req, res, next) {
        return error.errorResponse(404, "middlewareError", `El modo de la aplicación es incorrecto. Solo funcionará en modo "api" o "integrado"`, res);
    }

    // error por si esta mal seteado el modo de inicio de la aplicación
    errorStartModo(req, res, next) {
        return error.errorResponse(404, "middlewareError", `El modo de inicio de la aplicación es incorrecto. Solo funcionará en modo "FORK" o "CLUSTER"`, res);
    }
}

module.exports = {
    AppMidd
};