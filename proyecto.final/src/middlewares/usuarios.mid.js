const { errorResponse } = require('../error/error.response');
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const bcrypt = require('bcrypt');
const { fnUsuarios } = require('../persistencia/factory');

class UserMid {
    constructor() { }

    // valida que exista un usuario logueado
    usuarioLogueado(req, res, next) {
        try {
            if (req.user) {
                next();
            } else {
                return error.errorResponse(401, "middlewareError", "No existe un usuario logueado.", res);
            }
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando la existencia del usuario -> " + e.message, res);
        }
    }

    // valida que esten cargados ambos datos para loguearse
    datosLogin(req, res, next) {
        try {
            if (!req.body.username || !req.body.password) {
                return error.errorResponse(400, "middlewareError", "Por favor, debe ingresar su usuario y contraseña para poder loguearse.", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos del login -> " + e.message, res);
        }
    }

    // valida que esten cargados todos los datos para registrarse
    datosRegistro(req, res, next) {
        try {
            if (!req.body.firstname || !req.body.direction || !req.body.username || !req.body.password || !req.body.age || !req.body.telephone) {
                return error.errorResponse(400, "middlewareError", "Por favor, debe ingresar todos los campos obligatorios para poder registrarse: firstname, direction, username (email), password, age y telephone.", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos del registro -> " + e.message, res);
        }
    }

    // valida que todos los campos esten completo para cambiar la contraseña
    async validarExistaPass(req, res, next) {
        try {
            if (!req.body.oldPass || !req.body.newPass || !req.body.repeatNewPass) {
                return error.errorResponse(400, "middlewareError", "Por favor, complete los 3 campos para poder cambiar su contraseña.", res); 
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e, res);
        }
    }

    // valida que la password antigua sea correcta
    async validarViejaPass(req, res, next) {
        try {
            const user = await fnUsuarios().leerInfoPorId(req.session.user.id);
            const isValidPassword = (user, password) => bcrypt.compareSync(password, user);
            if (!isValidPassword(user[0].password, req.body.oldPass)) {
                return error.errorResponse(400, "middlewareError", "La vieja contraseña ingresada no coincide, por favor, reintente.", res);
            } 
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e, res);
        }
    }

    // valida que las nuevas passwords sean iguales
    validarNuevasPass(req, res, next) {
        try {
            if (req.body.newPass != req.body.repeatNewPass) {
                return error.errorResponse(400, "middlewareError", "Las nuevas contraseñas no coinciden, por favor, reintente.", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando las contraseñas -> " + e.message, res);
        }
    }
}


module.exports = {
    UserMid,
};