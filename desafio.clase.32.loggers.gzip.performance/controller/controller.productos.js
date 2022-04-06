const { fnProductos } = require('../persistencia/index');

const { logger, errorLogger } = require('../log4js/index');

// muestra todos los productos
async function obtenerProductos(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const prod = await fnProductos().leerInfo();
    res.json(prod);
}

// muestra un producto
async function obtenerProductoPorId(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const { idProd } = req.params;
    const prodFiltrado = await fnProductos().leerInfoPorId(idProd);
    if (!prodFiltrado) {
        errorLogger.error('error')
        return res.status(404).json({ error: -1, message: `producto no encontrado` })
    }
    res.json(prodFiltrado);
}

// elimina un producto, muestra array completo de productos
async function eliminarProducto(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const { idProd } = req.params;
    const productosPostDelete = await fnProductos().eliminarInfo(idProd)
    if (productosPostDelete.error) {
        errorLogger.error('error')
        return res.status(400).json(productosPostDelete)
    }
    res.json(productosPostDelete);
}

// incorpora nuevo producto, lo muestra
async function subirProducto(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const nuevoProducto = await fnProductos().subirInfo(req.body);
    if (nuevoProducto.error) {
        errorLogger.error('error')    
        return res.status(400).json(nuevoProducto)
    }
    res.json(nuevoProducto);
}

// modifica un producto, lo muestra
async function modificarProducto(req, res) {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const { idProd } = req.params;
    const prodNuevaCaract = {
        ...req.body,
        id: +idProd,
        timestamp: Date.now(),
    };
    const productoModificado = await fnProductos().actualizarInfo(prodNuevaCaract)
    if (productoModificado.error === -1) {
        errorLogger.error('error')    
        return res.status(404).json(productoModificado)
    }
    if (productoModificado.error === -3) {
        errorLogger.error('error')    
        return res.status(400).json(productoModificado)
    }
    res.json(productoModificado);
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto,
}