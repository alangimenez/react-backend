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
            res.render('../views/table', { mensaje: req.session.user });
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

/*const logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
                console.log('error')
                res.clearCookie('my-session');
            }
            else {
                 console.log('todo ok'); 
                console.log('1')
                res.redirect('/login');
                console.log('2')
                res.clearCookie('my-session'); 

            }
        })
    }
    catch (err) {
        console.log(err);
    }
} */

module.exports = {
    productosRandom,
    renderizarVista,
    login,
    /* logout */
}