const fs = require('fs');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const {pathCarrito} = require('./middlewares');

function controlId(req, res, next) {
    const { idCarr } = req.params;
    const carrito = leerArchivo(pathCarrito);
    const result = carrito.findIndex(e => e.id === +idCarr);
    if (result === -1) return res.status(404).json({error: -8, message: `El carrito solicitado no existe`});
    next();
}

function productosEnCarrito (req, res, next) {
    const {idCarr} = req.params;
    const carrito = leerArchivo(pathCarrito);
    const result = carrito.find(e => e.id === +idCarr);
    if (!result.producto) return res.status(400).json({error: -9, message: `El carrito solicitado no contiene productos cargados`})
    next();
}

module.exports = {
    controlId,
    productosEnCarrito
}