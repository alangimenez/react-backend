const { CrudBasico } = require('../persistencia/crud');
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const pathProductos = `./assets/productos.txt`;
const { fnProductos, fnCarritos } = require('../persistencia/index');

const producto = new CrudBasico();

// muestra todos los productos
async function obtenerProductos(req, res) {
    const prod = await fnProductos().leerInfo();
    res.json(prod);
}

// muestra un producto
function obtenerProductoPorId(req, res) {
    const { idProd } = req.params;
    const prodFiltrado = fnProductos().leerInfoPorId(idProd);
    res.json(prodFiltrado);
}

// elimina un producto, muestra array completo de productos
function eliminarProducto(req, res) {
    const { idProd } = req.params;
    const productosPostDelete = fnProductos().eliminarInfo(idProd)
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