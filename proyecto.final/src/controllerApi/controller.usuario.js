const { CartController } = require('./controller.carrito');
const cart = new CartController();
const { enviarMail } = require('../utils/nodemailer');
path = require('path')
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();

class UserController {
    constructor() { }

    // registra un nuevo usuario
    // 1) crea el carrito del usuario y lo asocia al mismo
    // 2) envia el email de registro
    // 3) devuelve al usuario registrado
    registro = async (req, res) => {
        try {
            cart.crearCarrito(req, res);
            enviarMail(process.env.USER_NODEMAILER,
                `Nuevo registro`,
                `Se registro el usuario ${req.body.username}. Nombre: ${req.body.firstname}. Direccion: ${req.body.direction}. 
                Edad: ${req.body.age}. Telefono: ${req.body.telephone}`)
            delete req.body.password;
            res.status(201).json(req.body);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // desloguea al usuario y destruye la sesión
    logout = (req, res) => {
        try {
            req.session.destroy(() => {
                res.clearCookie('my-session');
                res.status(200).json({ message: `El usuario se ha deslogueado correctamente` })
            })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // obtiene datos del perfil del usuario
    perfil = (req, res) => {
        try {
            res.status(200).json({
                user: req.user.id,
                nombre: req.user.nombre,
                direccion: req.user.direccion,
                edad: req.user.edad,
                telefono: req.user.telefono,
                foto: req.user.foto,
            })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // subir un avatar al perfil y guardarla en la carpeta public con nombre unico
    avatar = async (req, res) => {
        try {
            if (!req.file) {
                return error.errorResponse(400, "middlewareError", "Por favor, debe cargar un archivo.", res);
            }
            res.status(201).json(await repository.subirAvatarPerfil(req.file, req.session.user.id, res));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // loguearse y obtener los datos de perfil
    login = (req, res) => {
        try {
            const user = {
                nombre: req.session.user.nombre,
                direccion: req.session.user.direccion,
                edad: req.session.user.edad,
                telefono: req.session.user.telefono
            }
            res.status(200).json(user);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para renderizar error de registro
    registroError = (req, res) => {
        try {
            res.status(400).json({ error: req.session.error });
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para renderizar error de login
    loginError = (req, res) => {
        try {
            res.status(400).json({ error: req.session.error });
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para actualizar datos de perfil (telefono y dirección)
    async actualizarPerfil(req, res) {
        try {
            res.status(201).json(await repository.actualizarDatosPerfil(req))
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para cambiar la password
    async cambiarPassword(req, res) {
        try {
            res.status(201).json(await repository.cambiarContrasena(req.session.user.id, req.body.newPass))
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }
}

module.exports = {
    UserController,
}