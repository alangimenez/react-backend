const { fnProductos, fnCarritos } = require('../persistencia/index');
const {enviarMailPedido} = require('../utils/nodemailer');
const whatsapp = require('../utils/twilio');

// crea carrito, muestra objeto
async function crearCarrito(req, res) {
    const nuevoCarrito = await fnCarritos().subirInfo();
    res.json(nuevoCarrito);
}

// elimina carrito, muestra array completo
async function eliminarCarrito(req, res) {
    const { idCarr } = req.params;
    const listadoActualizado = await fnCarritos().eliminarInfo(+idCarr)
    res.json(listadoActualizado);
}

// inserta productos en carrito, muestra el carrito seleccionado completo
async function prodAlCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const productoSeleccionado = await fnProductos().leerInfoPorId(idProd);
    if (!productoSeleccionado) return res.status(404).json({error: -1, message: `producto no encontrado`});
    const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
    if (!carritoSeleccionado) return res.status(404).json({error: -4, message: `carrito no encontrado`});
    const carritoActualizado = await fnCarritos().actualizarProdEnCarrito(carritoSeleccionado, productoSeleccionado);
    res.json(carritoActualizado);
}

// lista todos los productos de un carrito
async function prodDelCarrito(req, res) {
    const { idCarr } = req.params;
    const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
    if (!carritoSeleccionado) return res.status(404).json({error: -4, message: `carrito no encontrado`})
    if (carritoSeleccionado.productos.length === 0) return res.json({error: -5, message: `el carrito no posee productos`})
    res.json(carritoSeleccionado.productos);
}

// elimina productos del carrito, muestra listado de productos del carrito
async function elimProdDelCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const listadoCarritos = await fnCarritos().leerInfo();
    const carritoSeleccionado = listadoCarritos.find(e => e.id === +idCarr);
    if (!carritoSeleccionado) return res.status(404).json({error: -4, message: `carrito no encontrado`});
    const prodEnCarrito = carritoSeleccionado.productos.find(e => e.id === +idProd);
    if (!prodEnCarrito) return res.status(400).json({error: -6, message: `el producto no existe en el carrito`});
    const carritoActualizado = await fnCarritos().eliminarProdEnCarrito(listadoCarritos, carritoSeleccionado, prodEnCarrito)
    res.json(carritoActualizado);
}

async function confirmarCompra (req, res) {
    const carrito = await fnCarritos().leerInfoPorId(req.params.idCarr);
    const productosConfirmados = carrito.productos;
    enviarMail("Alan", "Alan", productosConfirmados);
    whatsapp('+5491122558261', 'Alan', 'Alan');
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito, 
    confirmarCompra
}