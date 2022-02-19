const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const pathProductos = `./assets/productos.txt`;

const producto = new CrudBasico();

// muestra todos los productos
function obtenerProductos(req, res) {
    res.json(leerArchivo(pathProductos));
}

// muestra un producto
function obtenerProductoPorId(req, res) {
    const { idProd } = req.params;
    const productos = leerArchivo(pathProductos);
    const productoIdMostrar = producto.read(productos, idProd);
    res.json(productoIdMostrar);
}

// elimina un producto, muestra array completo de productos
function eliminarProducto(req, res) {
    const { idProd } = req.params;
    const productos = leerArchivo(pathProductos);
    const productosPostDelete = producto.delete(productos, idProd);
    escribirArchivo(pathProductos, productosPostDelete);
    res.json(productosPostDelete);
}

// incorpora nuevo producto, lo muestra
function subirProducto(req, res) {
    const productos = leerArchivo(pathProductos);
    const { array: productosActualizado, nuevoProducto } = producto.create(productos, req.body)
    escribirArchivo(pathProductos, productosActualizado);
    res.json(nuevoProducto);
}

// modifica un producto, lo muestra
function modificarProducto(req, res) {
    const { idProd } = req.params;
    const productos = leerArchivo(pathProductos);
    // const productoSeleccionado = producto.read(productos, req.params.id); //devuelve un producto
    const prodNuevaCaract = {
        ...req.body,
        id: +idProd,
        timestamp: Date.now(),
    };
    const { array: listadoModificado, result: indexProdModificado } = producto.put(productos, prodNuevaCaract);
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