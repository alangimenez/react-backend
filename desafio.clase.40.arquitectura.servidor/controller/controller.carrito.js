const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { logger, errorLogger } = require('../config/log4js');
const { nuevoCarrito, eliminarProductosDelCarrito, agregarProductosAlCarrito, obtenerProductosDelCarrito } = require('../persistencia/repository/reporitoryMongo');
const { error } = require('../error/error');

// retorna todos los carritos. Terminado el proyecto, ELIMINARLO porque no es parte de la consigna
async function obtenerTodosLosCarritos(req, res) {
    try {
        res.status(200).json(await fnCarritos().leerInfo());
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// crea carrito, muestra objeto
async function crearCarrito(req, res) {
    try {
        await res.status(201).json(await nuevoCarrito(req.body.name));
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// elimina carrito, muestra array completo
async function eliminarCarrito(req, res) {
    try {
        const listadoActualizado = await fnCarritos().eliminarInfo(+req.params.idCarr);
        res.status(201).json(listadoActualizado);
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// inserta productos en carrito, muestra el carrito seleccionado completo
async function prodAlCarrito(req, res) {
    try {
        res.status(201).json(await agregarProductosAlCarrito(+req.params.idCarr, +req.params.idProd));
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// lista todos los productos de un carrito
async function prodDelCarrito(req, res) {
    try {
        const carritoSeleccionado = await obtenerProductosDelCarrito(+req.params.idCarr);
        res.status(200).json(carritoSeleccionado.productos);
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }

}

// elimina productos del carrito, muestra listado de productos del carrito
async function elimProdDelCarrito(req, res) {
    try {
        res.status(201).json(await eliminarProductosDelCarrito(+req.params.idCarr, +req.params.idProd));
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
    
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    obtenerTodosLosCarritos
}