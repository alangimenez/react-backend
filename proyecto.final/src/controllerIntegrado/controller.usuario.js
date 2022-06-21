const { CartController } = require('./controller.carrito');
const cart = new CartController();
const { enviarMailRegistro, enviarMail } = require('../utils/nodemailer');
path = require('path');
const { errorLogger } = require('../config/config.log4js');

const { DaoMongoUsuario } = require('../persistencia/daos/usuario/daoMongoUsuario');
const UsuarioMongo = new DaoMongoUsuario();
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();

class UserController {
    constructor() { }

    renderizarVista = (req, res) => {
        try {
            if (req.user) {
                res.render('../views/table', { mensaje: req.user.id });
            }
            else {
                res.redirect('/api/usuario/login')
            }
        }
        catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    registro = async (req, res) => {
        try {
            cart.crearCarrito(req, res);
            enviarMail(process.env.USER_NODEMAILER, 
                `Nuevo registro`, 
                `Se registro el usuario ${req.body.username}. Nombre: ${req.body.firstname}. Direccion: ${req.body.direction}. 
                Edad: ${req.body.age}. Telefono: ${req.body.telephone}`)
            delete req.body.password;

            // response con JSON
            // res.status(201).json(req.body);

            // response con template
            res.redirect('/api/productos');    
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    logout = (req, res) => {
        try {
            if (req.session.user) {
                const user = req.session.user.id;
                req.session.destroy(() => {
                    res.clearCookie('my-session');
                    res.render('../views/logout', { usuario: user, title: "¡Vuelva pronto!" });
                })     
            } else {
                res.status(400).json({ message: `No existe usuario logueado para desloguearse`, title: "¡Ops!" })
            }
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    perfil = (req, res) => {
        try {
            // response con JSON
            /*if (req.user) {
                res.status(200).json({
                    user: req.user.id,
                    nombre: req.user.nombre,
                    direccion: req.user.direccion,
                    edad: req.user.edad,
                    telefono: req.user.telefono,
                    foto: req.user.foto,
                })
            } else {
                res.status(401).json({ error: `No existe usuario logueado` });
            }*/

            // response con template
            res.render('../views/perfil', {
                isActive: req.session.user.id,
                user: req.session.user.id,
                boton: "Cerrar sesión",
                nombre: req.session.user.nombre,
                direccion: req.session.user.direccion,
                edad: req.session.user.edad,
                telefono: req.session.user.telefono,
                foto: req.session.user.foto, // ver como setear este dato en la sesion una vez subida la foto
                title: "Mi perfil"
            })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    avatar = async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                // const error = new Error('Debes cargar un archivo');
                // error.httpStatusCode = 400;
                // return next(error);
                return res.status(400).json({ error: `No hay un archivo cargado` });
            }
            const usuario = {
                id: req.user.id,
                foto: path.join(`/${file.filename}`)
            }
            await UsuarioMongo.actualizarAvatarUsuario(usuario);

            req.session.user.foto = usuario.foto;
            req.session.save(err => errorLogger.error(`Hubo un error al actualizar datos de la sesión => ${err}`));

            // response con json
            // res.status(201).json(usuario);

            // response con template
            res.redirect(`/api/usuario/mi-perfil`)
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }

    }

    login = (req, res) => {
        try {
            res.redirect('/api/productos')
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador "Usuario" ha tenido un error -> ` + e.message, res);
        }
    }

    registroError = (req, res) => {
        try {
            // response con JSON
            // res.status(400).json({ error: req.session.error });

            // response con template
            res.render('registroError', { error: req.session.error, title: "¡Ops!" })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    loginError = (req, res) => {
        try {
            // response con JSON
            // res.status(400).json({ error: req.session.error });

            // response con template
            res.render('loginError', { error: req.session.error, title: "¡Ops!" })
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }
}

module.exports = {
    UserController,
}