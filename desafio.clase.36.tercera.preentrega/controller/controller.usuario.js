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

const registro = (req, res) => {
    res.render('registro')
}

const logout = (req, res) => {
    if (req.user) {
        const user = req.user.id;
        req.session.destroy(() => {
            res.clearCookie('my-session');
            res.render('../views/logout', { usuario: user });
        })
    } else {
        res.redirect('/api/usuario/login')
    }
}

module.exports = {
    //productosRandom,
    renderizarVista,
    //login,
    logout, 
    registro
}