const { leerArchivo } = require('../persistencia/fileSystem');
const { pathCarrito } = require('./middlewares');
const { logger, errorLogger } = require('../config/config.log4js');
const { errorResponse } = require('../error/error.response');

/* // controla si existe el carrito
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
} */

function validarUser(req, res, next) {
    try {
        if (!req.body.name) {
            return errorResponse("middlewareError", "Por favor, introduzca un usuario valido", res);
        };
        if (typeof (req.body.name) != "string") {
            return errorResponse(400, "middlewareError", "Por favor, introduzca un usuario en formato string", res);
        }
        next();
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del usuario -> " + e.message, res);
    }
}

async function validarCarrito(req, res, next) {
    try {
        if (isNaN(req.params.idCarr)) {
            return errorResponse(400, "middlewareError", "Por favor, introduzca un identificador de carrito en formato numero", res);
        }
        const carrito = await fnCarritos().leerInfoPorId(+req.params.idCarr);
        if (carrito.length === 0) {
            return errorResponse(400, "middlewareError", "El carrito buscado no se encuentra", res);
        }
        next();
    } catch (e) {
        return error(500, "middlewareError", "Ha ocurrido un error en la validación del carrito -> " + e.message, res);
    }
}

async function validarProductoEnCarrito(req, res, next) {
    try {
        if (isNaN(req.params.idProd)) {
            return errorResponse(400, "middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
        }
        const carrito = await fnCarritos().leerInfoPorId(+req.params.idCarr);
        if (carrito[0].productos.length === 0) return error("middlewareError", "El carrito esta vacio", res);
        const prodEnCarrito = carrito[0].productos.find(e => e.id === +req.params.idProd);
        if (!prodEnCarrito) {
            return errorResponse(404, "middlewareError", "El producto no se encuentra en el carrito", res);
        }
        next();
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error validando si existe el producto en el carrito -> " + e.message, res);
    }
}

function validarUnidadesProductos(req, res, next) {
    try {
        if (isNaN(req.body.cantidad) || req.body.cantidad < 1) {
            return errorResponse(400, "middlewareError", "Cantidad ingresada incorrecta, por favor, ingrese una cantidad numerica mayor a cero", res);
        }
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error validando las unidades del producto -> " + e.message, res);
    }
}

module.exports = {
    validarProductoEnCarrito,
    validarCarrito,
    validarUser,
    validarUnidadesProductos
}