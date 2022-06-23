const { errorLogger } = require('../config/config.log4js');

class AppMidd {
    constructor() { }

    // error si no existe ruta
    validarRuta(req, res, next) {
        errorLogger.error(`ruta '${req.baseUrl}' metodo ${req.method} no implementado`)
        res.status(404).json({ error: -2, descripcion: `ruta '${req.baseUrl}' metodo ${req.method} no implementado` })
    }

    // error por si esta mal seteado el modo de funcionamiento de la aplicación
    errorModo(req, res, next) {
        errorLogger.error(`El modo de la aplicación es incorrecto. Solo funcionará en modo 'api' o 'integrado'`)
        res.status(404).json({ errorMessage: `El modo de la aplicación es incorrecto. Solo funcionará en modo "api" o "integrado"` })
    }
}

module.exports = {
    AppMidd
};