const { errorResponse } = require('../error/error.response')

class UserMid {
    constructor() {}

    usuarioLogueado(req, res, next) {
        try {
            if (req.user) {
                next();
            } else {
                return errorResponse(401, "middlewareError", "No existe un usuario logueado.", res);
            }
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando la existencia del usuario -> " + e.message, res);
        }
    }

    datosLogin(req, res, next) {
        try {
            if (!req.body.username || !req.body.password) {
                return errorResponse(400, "middlewareError", "Por favor, debe ingresar su usuario y contraseña para poder loguearse.", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos del login -> " + e.message, res);
        }
    }

    datosRegistro (req, res, next) {
        try {
            if (!req.body.firstname || !req.body.direction || !req.body.username || !req.body.password || !req.body.age || !req.body.telephone) {
                return errorResponse(400, "middlewareError", "Por favor, debe ingresar todos los campos obligatorios para poder registrarse: firstname, direction, username (email), password, age y telephone.", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos del registro -> " + e.message, res);
        }
    }
}


module.exports = {
    UserMid,
};