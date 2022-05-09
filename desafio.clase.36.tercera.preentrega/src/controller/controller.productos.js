const { fnProductos } = require('../persistencia/index');
const passport = require('../middlewares/passport');
const { logger, errorLogger } = require('../config/config.log4js');

// muestra todos los productos
async function obtenerProductos(req, res) {
    const prod = await fnProductos().leerInfo();

    // con JSON
    res.status(200).json(prod);

    // con template handlebars
    /* if (req.user) {
        res.render('../views/productos', { listaProductos: prod, isActive: req.user.id, boton: "Cerrar sesión", user: req.user.id, logout: 'logout' });
    } else {
        res.render('../views/productos', { listaProductos: prod, boton: "Iniciar sesión", login: 'login' });
    } */
}

// muestra un producto
async function obtenerProductoPorId(req, res) {
    const { idProd } = req.params;
    try {
        const prodFiltrado = await fnProductos().leerInfoPorId(idProd);
        if (!prodFiltrado) {
            errorLogger.error(`producto no encontrado`)
            return res.status(404).json({ error: -1, message: `producto no encontrado` })
        }
        // response with JSON
        res.status(200).json(prodFiltrado);
    } catch (e) {
        return res.status(400).json({ error: -10, message: `Por favor, ingrese un número ID válido para buscar` })
    }

    // response with templates
    /* if (req.user) {
        res.render('../views/productoIndividual', { objeto: prodFiltrado, isActive: req.user.id, boton: "Cerrar sesión", user: req.user.id });
    } else {
        res.render('../views/productoIndividual', { objeto: prodFiltrado, boton: "Iniciar sesión", user: "na" });
    } */
}

// elimina un producto, muestra array completo de productos
async function eliminarProducto(req, res) {
    try {
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
            stock: req.body.stock,
            cantidad: 1
        }
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
        res.status(400).json({error: -12, message:`Los datos cargados no son correctos. Por favor verifique y vuelva a intentarlo`})
    }
    
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto,
}