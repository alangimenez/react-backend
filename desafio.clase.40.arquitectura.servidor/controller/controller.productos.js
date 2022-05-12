const { fnProductos } = require('../persistencia/factory');
const { controlProps } = require('../middlewares/controlProps');
const { logger, errorLogger } = require('../config/log4js');
const { error } = require('../error/error');
const { obtenerTodosLosProductos,
    obtenerProductPorId,
    eliminarProductPorId, 
    subirNuevoProducto, 
    actualizarProductoPorId } = require('../persistencia/repository/reporitoryMongo');

// muestra todos los productos
async function obtenerProductos(req, res) {
    try {
        res.status(200).json(await obtenerTodosLosProductos());
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// muestra un producto
async function obtenerProductoPorId(req, res) {
    try {
        res.status(200).json(await obtenerProductPorId(+req.params.idProd));
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// elimina un producto, muestra array completo de productos
async function eliminarProducto(req, res) {
    try {
        res.status(201).json(await eliminarProductPorId(+req.params.idProd))
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// incorpora nuevo producto, lo muestra
async function subirProducto(req, res) {
    try {
        res.status(201).json(await subirNuevoProducto(req.body));
    } catch (e) {
        return error("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// modifica un producto, lo muestra
async function modificarProducto(req, res) {
    try {
        res.status(201).json(await actualizarProductoPorId(+req.params.idProd, req.body))
    } catch (e) {
        logger.error(e);
        res.status(400).json({ error: -12, message: `Los datos cargados no son correctos. Por favor verifique y vuelva a intentarlo` })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto,
}