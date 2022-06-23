const { CartController } = require('./controller.carrito');
const cart = new CartController();
const { enviarMail } = require('../utils/nodemailer');
path = require('path');
const { errorLogger } = require('../config/config.log4js');
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
            res.redirect('/api/productos');
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // desloguea al usuario y destruye la sesión
    logout = (req, res) => {
        try {
            req.session.destroy(() => {
                res.clearCookie('my-session');
                res.render('../views/logout', { usuario: req.session.user.id, title: "¡Vuelva pronto!" });
            })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // renderiza datos del perfil del usuario
    perfil = (req, res) => {
        try {
            res.render('../views/perfil', {
                isActive: req.session.user.id,
                user: req.session.user.id,
                boton: "Cerrar sesión",
                nombre: req.session.user.nombre,
                direccion: req.session.user.direccion,
                edad: req.session.user.edad,
                telefono: req.session.user.telefono,
                foto: req.session.user.foto,
                title: "Mi perfil"
            })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // subir un avatar al perfil y guardarla en la carpeta public con nombre unico
    avatar = async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: `No hay un archivo cargado` });
            }
            const usuario = await repository.subirAvatarPerfil(req.file, req.session.user.id, res);
            req.session.user.foto = usuario.foto;
            req.session.save(err => errorLogger.error(`Hubo un error al actualizar datos de la sesión => ${err}`));
            res.redirect(`/api/usuario/mi-perfil`);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }

    }

    // loguearse y obtener los datos de perfil
    login = (req, res) => {
        try {
            res.redirect('/api/productos')
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador "Usuario" ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para renderizar error de registro
    registroError = (req, res) => {
        try {
            res.render('registroError', { error: req.session.error, title: "¡Ops!" })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para renderizar error de login
    loginError = (req, res) => {
        try {
            res.render('loginError', { error: req.session.error, title: "¡Ops!" })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para actualizar datos de perfil (telefono y dirección)
    async actualizarPerfil(req, res) {
        try {
            await repository.actualizarDatosPerfil(req, res);
            res.redirect('/api/usuario/mi-perfil')
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // endpoint para cambiar la password
    async cambiarPassword(req, res) {
        try {
            await repository.cambiarContrasena(req.session.user.id, req.body.newPass);
            return res.status(201).json({ message: `La contraseña fue cambiada con éxito` });
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }
}

module.exports = {
    UserController,
}