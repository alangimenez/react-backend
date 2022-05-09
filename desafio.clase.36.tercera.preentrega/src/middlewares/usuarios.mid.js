function usuarioLogueado(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({error: `No hay un usuario logueado`})
    }
}

module.exports = usuarioLogueado;