const fs = require('fs');
const { CrudBasico } = require('./crud');
const { leerArchivo, escribirArchivo } = require('./fileSystem');

const producto = new CrudBasico();

function obtenerProductos(req, res) {
    const productos = leerArchivo('./assets/productos.txt');
    res.json(productos);
}

function obtenerProductoPorId(req, res) {
    const { id } = req.params;
    const productos = leerArchivo('./assets/productos.txt');
    const productoIdMostrar = producto.read(productos, id);
    res.json(productoIdMostrar);
}

function eliminarProducto(req, res) {
    const { id } = req.params;
    const productos = leerArchivo('./assets/productos.txt');
    const productosPostDelete = producto.delete(productos, id);
    escribirArchivo('./assets/productos.txt', productosPostDelete);
    res.json(productosPostDelete);
}

function subirProducto(req, res) {
    const productos = leerArchivo('./assets/productos.txt');
    const productosActualizado = producto.create(productos, req.body)
    escribirArchivo('./assets/productos.txt', productosActualizado);
    res.json(productosActualizado);
}

function modificarProducto(req, res) {
    const { id } = req.params;
    const productos = leerArchivo('./assets/productos.txt');
    const infos = producto.read(productos, req.params.id); //devuelve un producto
    const prodNuevaCaract = {
      id,
      ...req.body,
    };
    const productoModificado = producto.put(infos, prodNuevaCaract);
    const filtro = (dato) => dato.id == id;
    const result = productos.findIndex(filtro);
    productos[result] = productoModificado[0];
    escribirArchivo('./assets/productos.txt', productos)
    res.json(productos);
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto
}