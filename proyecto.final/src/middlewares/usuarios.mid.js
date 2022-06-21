const { errorResponse } = require('../error/error.response');
const bcrypt = require('bcrypt');
const { fnUsuarios } = require('../persistencia/factory');

class UserMid {
    constructor() { }

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

    datosRegistro(req, res, next) {
        try {
            if (!req.body.firstname || !req.body.direction || !req.body.username || !req.body.password || !req.body.age || !req.body.telephone) {
                return errorResponse(400, "middlewareError", "Por favor, debe ingresar todos los campos obligatorios para poder registrarse: firstname, direction, username (email), password, age y telephone.", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos del registro -> " + e.message, res);
        }
    }

    async validarExistaPass(req, res, next) {
        try {
            if (!req.body.oldPass || !req.body.newPass || !req.body.repeatNewPass) {
                return errorResponse(400, "middlewareError", "Por favor, complete los 3 campos para poder cambiar su contraseña.", res); 
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e, res);
        }
    }

    async validarViejaPass(req, res, next) {
        try {
            const user = await fnUsuarios().leerInfoPorId(req.session.user.id);
            const isValidPassword = (user, password) => bcrypt.compareSync(password, user);
            if (!isValidPassword(user[0].password, req.body.oldPass)) {
                return errorResponse(400, "middlewareError", "La vieja contraseña ingresada no coincide, por favor, reintente.", res);
            } 
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e, res);
        }
    }

    validarNuevasPass(req, res, next) {
        try {
            if (req.body.newPass != req.body.repeatNewPass) {
                return errorResponse(400, "middlewareError", "Las nuevas contraseñas no coinciden, por favor, reintente.", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e.message, res);
        }
    }
}


module.exports = {
    UserMid,
};