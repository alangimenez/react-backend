const { leerArchivo } = require('../persistencia/fileSystem');
const { pathCarrito } = require('./middlewares');
const { logger, errorLogger } = require('../config/config.log4js');

// controla si existe el carrito
function validarCarrito(req, res, next) {
    const { idCarr } = req.params;
    const carrito = leerArchivo(pathCarrito);
    const result = carrito.findIndex(e => e.id === +idCarr);
    if (result === -1) {
        errorLogger.error(`El carrito solicitado no existe`);
        return res.status(404).json({ error: -8, message: `El carrito solicitado no existe` });
    }
    next();
}

// controla si el carrito tiene productos
function productosEnCarrito(req, res, next) {
    const { idCarr } = req.params;
    const carrito = leerArchivo(pathCarrito);
    const result = carrito.find(e => e.id === +idCarr);
    if (!result.producto) {
        errorLogger.error(`El carrito solicitado no contiene productos cargados`);
        return res.status(400).json({ error: -9, message: `El carrito solicitado no contiene productos cargados` })
    }
    next();
}

// controla que se pueda eliminar producto del carrito
function valProdDelCarrito(req, res, next) {
    const { idCarr, idProd } = req.params;
    const carrito = leerArchivo('./assets/carrito.txt');
    const carritoFiltrado = carrito.find(e => e.id === +idCarr);

    // controla si el producto existe en el carrito
    const prodFiltrado = carritoFiltrado.producto.findIndex(f => f.id === +idProd)
    if (prodFiltrado === -1) {
        errorLogger.error(`El carrito solicitado no contiene productos cargados`);
        return res.json({ error: -10, message: `El producto no existe en el carrito seleccionado` });
    }

    next();
}

module.exports = {
    validarCarrito,
    productosEnCarrito,
    valProdDelCarrito
}