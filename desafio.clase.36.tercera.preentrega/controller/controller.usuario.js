const { errorLogger } = require('../config/config.log4js');
const { crearCarrito } = require('../controller/controller.carrito')
const { enviarMailRegistro } = require('../utils/nodemailer');

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

const registro = (req, res) => {
    enviarMailRegistro(req.body.username, req.body.firstname, req.body.direction, req.body.age, req.body.telephone);
    crearCarrito(req, res);
    res.redirect('/api/productos');
}

const logout = (req, res) => {
    if (req.user) {
        const user = req.user.id;
        req.session.destroy(() => {
            res.clearCookie('my-session');
            res.render('../views/logout', { usuario: user });
        })
    } else {
        res.redirect('/login')
    }
}

const perfil = (req, res) => {
    res.render('../views/perfil', {
        isActive: req.user.id,
        user: req.user.id,
        boton: "Cerrar sesión",
        nombre: req.user.nombre,
        direccion: req.user.direccion,
        edad: req.user.edad,
        telefono: req.user.telefono,
    })
}

module.exports = {
    renderizarVista,
    logout,
    registro, 
    perfil
}