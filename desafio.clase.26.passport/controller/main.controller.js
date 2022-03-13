const { generarDatosRandom } = require('../utils/faker');


const productosRandom = (req, res) => {
    try {
        const datosFaker = generarDatosRandom();
        res.json(datosFaker);
    } catch (e) {
        console.log(e.message)
    }
}

const renderizarVista = (req, res) => {
    {
        try {
            res.render('../views/table', { mensaje: req.user.id });
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

const login = (req, res) => {
    const body = req.body.dato;
    res.json(body);
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

const registro = (req, res) => {
    res.render('registro')
}

module.exports = {
    productosRandom,
    renderizarVista,
    login,
    logout, 
    registro
}