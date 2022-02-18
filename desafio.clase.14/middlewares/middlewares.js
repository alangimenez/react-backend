const fs = require('fs');
const admin = true;
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const pathCarrito = './assets/carrito.txt';
const pathProductos = './assets/productos.txt';

function validarCarrito(req, res, next) {
    const { idCarr, idProd } = req.params;
    const carrito = leerArchivo('./assets/carrito.txt');
    const productos = leerArchivo('./assets/productos.txt');

    // validación idCarrito exista en el array
    const carrFiltrado = carrito.findIndex(e => e.id === +idCarr)
    if (carrFiltrado === -1) return res.json({ error: -7, message: `El carrito seleccionado no existe` })

    // validacion idProd exista dentro de los productos en listado
    const prodFiltrado = productos.findIndex(f => f.id === +idProd)
    if (prodFiltrado === -1) return res.json({ error: -5, message: `El producto seleccionado no existe` })
    next();
}

function validarDelete(req, res, next) {
    const { idCarr, idProd } = req.params;

    const carrito = leerArchivo('./assets/carrito.txt');

    // validación idCarrito exista en el array
    const carrFiltrado = carrito.find(e => e.id === +idCarr)
    if (carrFiltrado === undefined) return res.json({ error: -7, message: `El carrito seleccionado no existe` })

    // validacion si carrito tiene productos
    if (carrFiltrado.producto === undefined) return res.json({ error: -8, message: `El carrito seleccionado no contiene productos` })

    // validación idProducto exista en idCarrito
    const prodFiltrado = carrFiltrado.producto.findIndex(f => f.id === +idProd)
    if (prodFiltrado === -1) return res.json({ error: -10, message: `El producto no existe en el carrito seleccionado` })

    next();
}

// validacion si es admin o no
function validarAdmin(req, res, next) {
    if (admin === false) return res.status(401).json({ error: -1, descripcion: `ruta '${req.url}' metodo ${req.method} no autorizada` });
    next();
}

function validarRuta(req, res, next) {
    res.status(404).json({ error: -2, descripcion: `ruta '${req.url}' metodo ${req.method} no implementado` })
}

function validarArchivo(req, res, next) {
    try {
        const datoProducto = leerArchivo(pathProductos);
        const datoCarrito = leerArchivo(pathCarrito);
    }
    catch (e) {
        console.log(e.message)
        return res.status(400).json({ error: -3, message: `Los archivos que se buscan leer no existen o el formato es incorrecto.` })
    }
    next();
}

module.exports = {
    validarCarrito,
    validarDelete,
    validarAdmin,
    validarRuta,
    validarArchivo,
    pathCarrito,
    pathProductos
};