const fs = require('fs');
const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const pathProductos = `./assets/productos.txt`;

const producto = new CrudBasico();

function obtenerProductos(req, res) {
    res.json(leerArchivo(pathProductos));
}

function obtenerProductoPorId(req, res) {
    const { id } = req.params;
    const productos = leerArchivo(pathProductos);
    const productoIdMostrar = producto.read(productos, id);
    res.json(productoIdMostrar);
}

function eliminarProducto(req, res) {
    const { id } = req.params;
    const productos = leerArchivo(pathProductos);
    const productosPostDelete = producto.delete(productos, id);
    escribirArchivo(pathProductos, productosPostDelete);
    res.json(productosPostDelete);
}

function subirProducto(req, res) {
    const productos = leerArchivo(pathProductos);
    const {array: productosActualizado, nuevoProducto} = producto.create(productos, req.body)
    escribirArchivo(pathProductos, productosActualizado);
    res.json(nuevoProducto);
}

function modificarProducto(req, res) {
    const { id } = req.params;
    const productos = leerArchivo(pathProductos);
    const productoSeleccionado = producto.read(productos, req.params.id); //devuelve un producto
    const prodNuevaCaract = {
      id: +id,
      timestamp: Date.now(),
      ...req.body,
    };
    const {array: listadoModificado, result: indexProdModificado} = producto.put(productos, prodNuevaCaract);
    escribirArchivo(pathProductos, listadoModificado)
    res.json(listadoModificado[indexProdModificado]);
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto,
    pathProductos
}