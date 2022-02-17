const fs = require('fs');
const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const pathCarrito = './assets/carrito.txt';
const pathProductos = './assets/productos.txt';

const carrito = new CrudBasico();

function crearCarrito(req, res) {
    const carritos = leerArchivo(pathCarrito);
    const carritosActualizado = carrito.create(carritos);
    escribirArchivo(pathCarrito, carritosActualizado);
    res.json(carritosActualizado);
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
    const carritos = leerArchivo(pathCarrito);
    const productos = leerArchivo(pathProductos);
    const carritoSelecccionado = carrito.read(carritos, idCarr);
    const productoSeleccionado = carrito.read(productos, idProd);
    if (carritoSelecccionado[0].producto == undefined) carritoSelecccionado[0].producto = [];
    carritoSelecccionado[0].producto.push(productoSeleccionado[0]);
    const indexCarritoSeleccionado = carritos.indexOf(carritoSelecccionado[0])
    carritos[indexCarritoSeleccionado] = carritoSelecccionado[0];
    escribirArchivo(pathCarrito, carritos);
    res.json(carritos);
}

function prodDelCarrito(req, res) {
    const { idCarr } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const productoCarrito = carrito.read(carritos, idCarr);
    if (productoCarrito[0].producto == undefined) return res.json({error: "El carrito no tiene productos incorporados"})
    res.json(productoCarrito[0].producto);
}

function elimProdDelCarrito(req, res) {
    const { idCarr, idProd } = req.params;
    const carritos = leerArchivo(pathCarrito);
    const carritoFiltrado = carrito.read(carritos, idCarr);
    const carritoPostEliminado = carrito.delete(carritoFiltrado[0].producto, idProd);
    carritoFiltrado[0].producto = carritoPostEliminado
    const filtro = (dato) => dato.id == carritoFiltrado[0].id;
    const result = carritos.findIndex(filtro);
    carritos[result] = carritoFiltrado[0];
    res.json(carritos);
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito
}