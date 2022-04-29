const { fnProductos } = require('../persistencia/index');
const passport = require('../middlewares/passport');
const { logger, errorLogger } = require('../config/config.log4js');

// muestra todos los productos
async function obtenerProductos(req, res) {
    const prod = await fnProductos().leerInfo();
    if (req.user) {
        res.render('../views/productos', { listaProductos: prod, isActive: req.user.id, boton: "Cerrar sesión", user: req.user.id, logout: 'logout' });
    } else {
        res.render('../views/productos', { listaProductos: prod, boton: "Iniciar sesión", login: 'login' });
    }
}

// muestra un producto
async function obtenerProductoPorId(req, res) {
    const { idProd } = req.params;
    const prodFiltrado = await fnProductos().leerInfoPorId(idProd);
    if (!prodFiltrado) {
        errorLogger.error(`producto no encontrado`)
        return res.status(404).json({ error: -1, message: `producto no encontrado` })
    }
    // res.json(prodFiltrado);
    if (req.user) {
        res.render('../views/productoIndividual', { objeto: prodFiltrado, isActive: req.user.id, boton: "Cerrar sesión", user: req.user.id });
    } else {
        res.render('../views/productoIndividual', { objeto: prodFiltrado, boton: "Iniciar sesión", user: "na" });
    }
}

// elimina un producto, muestra array completo de productos
async function eliminarProducto(req, res) {
    const { idProd } = req.params;
    const productosPostDelete = await fnProductos().eliminarInfo(idProd)
    if (productosPostDelete.error) {
        errorLogger.error(productosPostDelete);
        return res.status(400).json(productosPostDelete);
    } 
    res.json(productosPostDelete);
}

// incorpora nuevo producto, lo muestra
async function subirProducto(req, res) {
    const nuevoProducto = await fnProductos().subirInfo(req.body);
    if (nuevoProducto.error) {
        errorLogger.error(nuevoProducto);
        return res.status(400).json(nuevoProducto);
    } 
    res.json(nuevoProducto);
}

// modifica un producto, lo muestra
async function modificarProducto(req, res) {
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
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto,
}