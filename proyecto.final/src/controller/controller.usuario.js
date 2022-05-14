const { errorLogger } = require('../config/config.log4js');
const { crearCarrito } = require('../controller/controller.carrito')
const { enviarMailRegistro } = require('../utils/nodemailer');
path = require('path')

const { DaoMongoUsuario } = require('../persistencia/daos/usuario/daoMongoUsuario');
const UsuarioMongo = new DaoMongoUsuario();

const renderizarVista = (req, res) => {
    try {
        if (req.user) {
            res.render('../views/table', { mensaje: req.user.id });
        }
        else {
            res.redirect('/api/usuario/login')
        }
    }
    catch (e) {
        errorLogger.error(e.message);
    }
}

const registro = async (req, res) => {
    enviarMailRegistro(req.body.username, req.body.firstname, req.body.direction, req.body.age, req.body.telephone);
    crearCarrito(req, res);

    // response con JSON
    res.status(201).json(req.body);

    // response con template
    // res.redirect('/api/productos');
}

const logout = (req, res) => {
    if (req.user) {
        const user = req.user.id;
        req.session.destroy(() => {
            res.clearCookie('my-session');
            // respuesta con JSON
            res.status(200).json({ message: `El usuario se ha deslogueado correctamente` })


            // respuesta con template
            // res.render('../views/logout', { usuario: user });
        })
    } else {
        res.status(400).json({ message: `No existe usuario logueado para desloguearse` })
    }
}

const perfil = (req, res) => {
    // response con JSON
    if (req.user) {
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
    }

    // response con template
    /*res.render('../views/perfil', {
        isActive: req.user.id,
        user: req.user.id,
        boton: "Cerrar sesión",
        nombre: req.user.nombre,
        direccion: req.user.direccion,
        edad: req.user.edad,
        telefono: req.user.telefono,
        foto: req.user.foto,
    })*/
}

const avatar = async (req, res) => {
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

    // response con json
    res.status(201).json(usuario);
    
    // response con template
    // res.redirect(`${req.user.id}/mi-perfil`)
}

const login = (req, res) => {
    const usuario = {
        id: req.user.id,
        nombre: req.user.nombre,
        direccion: req.user.direccion,
        edad: req.user.edad,
        telefono: req.user.telefono
    }
    res.status(200).json(usuario);
}

const registroError = (req, res) => {
    // response con JSON
    res.status(400).json({ error: req.session.error });

    // response con template
    // res.render('registroError', { error: req.session.error })
}

const loginError = (req, res) => {
    // resopnse con JSON
    res.status(400).json({ error: req.session.error });

    // response con template
    // res.render('loginError', { error: req.session.error })
}

module.exports = {
    renderizarVista,
    logout,
    registro,
    perfil,
    avatar,
    login,
    registroError,
    loginError
}