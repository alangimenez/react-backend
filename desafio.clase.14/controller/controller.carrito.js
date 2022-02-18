const fs = require('fs');
const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const { pathCarrito, pathProductos } = require('../middlewares/middlewares');

const carrito = new CrudBasico();

function crearCarrito(req, res) {
    const carritos = leerArchivo(pathCarrito);
    const {array: carritosActualizado, nuevoProducto: nuevoCarrito} = carrito.create(carritos);
    escribirArchivo(pathCarrito, carritosActualizado);
    res.json(nuevoCarrito);
}

function eliminarCarrito(req, res) {
    const { id } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const carritosActualizado = carrito.delete(carritos, id);
    escribirArchivo(pathCarrito, carritosActualizado);
    res.json(carritosActualizado);
}

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

function prodDelCarrito(req, res) {
    const { idCarr } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const productoCarrito = carrito.read(carritos, idCarr);
    res.json(productoCarrito.producto);
}

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