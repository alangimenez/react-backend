const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { logger, errorLogger } = require('../config/log4js');
const { nuevoCarrito,
    eliminarProductosDelCarrito,
    agregarProductosAlCarrito,
    obtenerProductosDelCarrito } = require('../persistencia/repository/reporitoryMongo');
const { error } = require('../error/error');
const { Repository } = require('../persistencia/repository/reporitoryMongo');
const repository = new Repository();

class CarritoController {
    constructor() { }

    // retorna todos los carritos. Terminado el proyecto, ELIMINARLO porque no es parte de la consigna
    async obtenerTodosLosCarritos(req, res) {
        try {
            res.status(200).json(await fnCarritos().leerInfo());
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // crea carrito, muestra objeto
    async crearCarrito(req, res) {
        try {
            await res.status(201).json(await repository.nuevoCarrito(req.body.name));
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina carrito, muestra array completo
    async eliminarCarrito(req, res) {
        try {
            const listadoActualizado = await fnCarritos().eliminarInfo(+req.params.idCarr);
            res.status(201).json(listadoActualizado);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // inserta productos en carrito, muestra el carrito seleccionado completo
    async prodAlCarrito(req, res) {
        try {
            res.status(201).json(await repository.agregarProductosAlCarrito(+req.params.idCarr, +req.params.idProd));
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // lista todos los productos de un carrito
    async prodDelCarrito(req, res) {
        try {
            const carritoSeleccionado = await repository.obtenerProductosDelCarrito(+req.params.idCarr);
            res.status(200).json(carritoSeleccionado.productos);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina productos del carrito, muestra listado de productos del carrito
    async elimProdDelCarrito(req, res) {
        try {
            res.status(201).json(await repository.eliminarProductosDelCarrito(+req.params.idCarr, +req.params.idProd));
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }
}


module.exports = {
    CarritoController,
}