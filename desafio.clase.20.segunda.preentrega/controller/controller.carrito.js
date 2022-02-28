const fs = require('fs');
const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const { pathCarrito, pathProductos } = require('../middlewares/middlewares');
const { fnProductos, fnCarritos } = require('../persistencia/index');

const carrito = new CrudBasico();

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
    const carritoActualizado = await fnCarritos().actualizarCarrito(carritoSeleccionado, productoSeleccionado);
    res.json(carritoActualizado);
}

// lista todos los productos de un carrito
function prodDelCarrito(req, res) {
    const { idCarr } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const productoCarrito = carrito.read(carritos, idCarr);
    res.json(productoCarrito.producto);
}

// elimina productos del carrito, muestra listado de productos del carrito
function elimProdDelCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const listadoCarrito = leerArchivo(pathCarrito);
    const carritoFiltrado = carrito.read(listadoCarrito, idCarr);
    const carritoPostEliminado = carrito.delete(carritoFiltrado.producto, idProd);
    carritoFiltrado.producto = carritoPostEliminado
    const result = listadoCarrito.findIndex(e => e.id === carritoFiltrado.id);
    listadoCarrito[result] = carritoFiltrado;
    escribirArchivo(pathCarrito, listadoCarrito);
    res.json(listadoCarrito[result]);
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito
}