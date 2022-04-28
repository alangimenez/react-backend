const { fnProductos, fnCarritos } = require('../persistencia/index');
const { enviarMailPedido } = require('../utils/nodemailer');
const { whatsapp, mensajeTexto } = require('../utils/twilio');
const { logger, errorLogger } = require('../config/config.log4js');

// ver carritos (este endpoint debe ELIMINARSE)
async function verCarritos(req, res) {
    const listadoCarritos = await fnCarritos().leerInfo();
    res.json(listadoCarritos);
}

// ver un carrito de un usuario en particular
async function verCarritoUsuario(req, res) {
    const carritoFiltrado = await fnCarritos().leerInfoPorId(req.params.idCarr);
    if (req.user) {
        res.render('../views/carrito', { productosEnCarrito: carritoFiltrado.productos, user: req.user.id, isActive: req.user.id, boton: "Cerrar sesión" });
    } else {
        // chequear esto, tecnicamente no deberia acceder al carrito si no esta logueado
        res.render('../views/loginError', { error: "Primero debe loguearse" });
    }
}

// crea carrito, muestra objeto
async function crearCarrito(req, res) {
    const nuevoCarrito = await fnCarritos().subirInfo(req.body.username);
    return (nuevoCarrito);
}

// elimina carrito, muestra array completo
async function eliminarCarrito(req, res) {
    const { idCarr } = req.params;
    const listadoActualizado = await fnCarritos().eliminarInfo(+idCarr)
    res.json(listadoActualizado);
}

// inserta productos en carrito, muestra el carrito seleccionado completo
async function prodAlCarrito(req, res) {
    if (req.user) {
        const { idCarr, idProd } = req.params;
        const productoSeleccionado = await fnProductos().leerInfoPorId(idProd);
        if (!productoSeleccionado) {
            errorLogger.error(`producto no encontrado`);
            return res.status(404).json({ error: -1, message: `producto no encontrado` });
        }
        const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
        if (!carritoSeleccionado) {
            errorLogger.error(`carrito no encontrado`);
            return res.status(404).json({ error: -4, message: `carrito no encontrado` });
        }
        const carritoActualizado = await fnCarritos().actualizarProdEnCarrito(carritoSeleccionado, productoSeleccionado);
        res.json(carritoActualizado);
    } else {
        res.json({ login: "login" })
    }

}

// lista todos los productos de un carrito
async function prodDelCarrito(req, res) {
    const { idCarr } = req.params;
    const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
    if (!carritoSeleccionado) {
        errorLogger.error(`carrito no encontrado`);
        return res.status(404).json({ error: -4, message: `carrito no encontrado` });
    }
    if (carritoSeleccionado.productos.length === 0) {
        errorLogger.error(`el carrito no posee productos`);
        return res.json({ error: -5, message: `el carrito no posee productos` });
    }
    res.json(carritoSeleccionado.productos);
}

// elimina productos del carrito, muestra listado de productos del carrito
async function elimProdDelCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const listadoCarritos = await fnCarritos().leerInfo();
    const carritoSeleccionado = listadoCarritos.find(e => e.id === +idCarr);
    if (!carritoSeleccionado) {
        errorLogger.error(`carrito no encontrado`);
        return res.status(404).json({ error: -4, message: `carrito no encontrado` });
    }
    const prodEnCarrito = carritoSeleccionado.productos.find(e => e.id === +idProd);
    if (!prodEnCarrito) {
        errorLogger.error(`el producto no existe en el carrito`);
        return res.status(400).json({ error: -6, message: `el producto no existe en el carrito` });
    }
    const carritoActualizado = await fnCarritos().eliminarProdEnCarrito(listadoCarritos, carritoSeleccionado, prodEnCarrito)
    res.json(carritoActualizado);
}


async function confirmarCompra(req, res) {
    const carrito = await fnCarritos().leerInfoPorId(req.params.idCarr);
    const productosConfirmados = carrito.productos;
    await enviarMailPedido(req.user.nombre, req.user.id, productosConfirmados);
    await whatsapp(req.user.telefono, req.user.nombre, req.user.id);
    await mensajeTexto(req.user.telefono, req.user.nombre);
    const resultado = await fnCarritos().vaciarCarrito(req.params.idCarr);
}

async function vaciarCarrito(req, res) {
    await fnCarritos().vaciarCarrito(req.body.id);
    res.json({ mensaje: req.body.id });
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    confirmarCompra,
    verCarritos,
    verCarritoUsuario,
    vaciarCarrito
}