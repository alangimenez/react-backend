const { fnProductos } = require('../persistencia/index');
const { controlProps } = require('../middlewares/controlProps');
const { logger, errorLogger } = require('../config/log4js');

// muestra todos los productos
async function obtenerProductos(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const prod = await fnProductos().leerInfo();
    res.json(prod);
}

// muestra un producto
async function obtenerProductoPorId(req, res) {
    try {
        logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
        const { idProd } = req.params;
        const prodFiltrado = await fnProductos().leerInfoPorId(idProd);
        if (!prodFiltrado) {
            errorLogger.error('error')
            return res.status(404).json({ error: -1, message: `producto no encontrado` })
        }
        res.json(prodFiltrado);
    } catch (e) {
        errorLogger.error(`Error en peticion a ${req.url}, metodo ${req.method}`)
        res.json({ error: `error`, message: `por favor, verifique el id ingresado` })
    }

}

// elimina un producto, muestra array completo de productos
async function eliminarProducto(req, res) {
    try {
        logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
        const { idProd } = req.params;
        const productosPostDelete = await fnProductos().eliminarInfo(idProd)
        if (productosPostDelete.error) {
            errorLogger.error(productosPostDelete);
            return res.status(400).json(productosPostDelete);
        }
        res.json(productosPostDelete).status(201);
    } catch (e) {
        logger.error(e);
        return res.status(400).json({ error: -10, message: `Por favor, ingrese un número ID válido para buscar` })
    }
}

// incorpora nuevo producto, lo muestra
async function subirProducto(req, res) {
    try {
        logger.info(`Peticion a ${req.url}, metodo ${req.method}`)

        const lista = await fnProductos().leerInfo();
        lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
        const nuevoProducto = {
            nombre: req.body.nombre,
            id: idNuevo,
            timestamp: Date.now(),
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            foto: req.body.foto,
            precio: req.body.precio,
            stock: req.body.stock
        }
        const validacion = controlProps(nuevoProducto);
        if (validacion) return res.status(400).json(validacion);
        const productoSubido = await fnProductos().subirInfo(nuevoProducto);
        if (nuevoProducto.error) {
            errorLogger.error(nuevoProducto);
            return res.status(400).json(nuevoProducto);
        }
        res.json(productoSubido);
    } catch (e) {
        logger.error(e);
        return res.status(400).json({ error: -11, message: `Las propiedad ingresadas no son del tipo admitidas, por favor verifique y reintente` });
    }
}

// modifica un producto, lo muestra
async function modificarProducto(req, res) {
    try {
        logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
        const { idProd } = req.params;
        const prodNuevaCaract = {
            ...req.body,
            id: +idProd,
            timestamp: Date.now(),
        };
        const productoModificado = await fnProductos().actualizarInfo(prodNuevaCaract)
        if (productoModificado.error === -1) {
            errorLogger.error(productoModificado);
            return res.status(404).json(productoModificado);
        }
        if (productoModificado.error === -3) {
            errorLogger.error(productoModificado);
            return res.status(400).json(productoModificado);
        }
        res.json(productoModificado);
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