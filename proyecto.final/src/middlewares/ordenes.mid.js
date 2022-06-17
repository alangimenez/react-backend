const { logger, errorLogger } = require('../config/config.log4js');
const { errorResponse } = require('../error/error.response');
const { fnProductos } = require('../persistencia/factory');

// revisa si es admin o no
function validarStatus(req, res, next) {
    try {
        if (req.body.status <= 0 || req.body.status >= 4 || isNaN(req.body.status)) {
            return errorResponse(403, "middlewareError", "Status incorrecto. Solo se puede establecer status 1 (en preparacion), 2 (despachado) o 3 (entregado)", res);
        }
        next();
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del status -> " + e.message, res);
    }
}

module.exports = {
    validarStatus,
}