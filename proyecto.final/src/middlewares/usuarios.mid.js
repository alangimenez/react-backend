const { errorResponse } = require('../error/error.response')

function usuarioLogueado(req, res, next) {
    try {
        if (req.user) {
            next();
        } else {
            return errorResponse(403, "middlewareError", "No existe un usuario logueado.", res);
            // res.status(401).json({error: `No hay un usuario logueado`})
        }
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error validando la existencia del usuario -> " + e.message, res);
    }
}

module.exports = {
    usuarioLogueado
};