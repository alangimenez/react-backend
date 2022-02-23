const fs = require('fs');
const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const { pathCarrito, pathProductos } = require('../middlewares/middlewares');
const { fnProductos, fnCarritos } = require('../persistencia/index');

const carrito = new CrudBasico();

// crea carrito, muestra objeto
async function crearCarrito(req, res) {
    const { nuevoObjeto : nuevoCarrito } = await fnCarritos().subirInfo();
    res.json(nuevoCarrito);
}

// elimina carrito, muestra array completo
function eliminarCarrito(req, res) {
    const { idCarr } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const carritosActualizado = carrito.delete(carritos, idCarr);
    escribirArchivo(pathCarrito, carritosActualizado);
    res.json(carritosActualizado);
}

// inserta productos en carrito, muestra el carrito seleccionado completo
function prodAlCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const listadoCarrito = leerArchivo(pathCarrito);
    const listadoProductos = leerArchivo(pathProductos);
    const carritoSelecccionado = carrito.read(listadoCarrito, idCarr); // objeto
    const productoSeleccionado = carrito.read(listadoProductos, idProd); // objeto
    if (carritoSelecccionado.producto === undefined) carritoSelecccionado.producto = [];
    carritoSelecccionado.producto.push(productoSeleccionado);
    const indexCarritoSeleccionado = listadoCarrito.indexOf(carritoSelecccionado)
    listadoCarrito[indexCarritoSeleccionado] = carritoSelecccionado;
    escribirArchivo(pathCarrito, listadoCarrito);
    res.json(carritoSelecccionado);
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