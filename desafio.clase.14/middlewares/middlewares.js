const admin = true;
const { leerArchivo } = require('../persistencia/fileSystem');
const pathCarrito = './assets/carrito.txt';
const pathProductos = './assets/productos.txt';

// revisa si es admin o no
function validarAdmin(req, res, next) {
    if (admin === false) return res.status(401).json({ error: -1, descripcion: `ruta '${req.url}' metodo ${req.method} no autorizada` });
    next();
}

// error si no existe ruta
function validarRuta(req, res, next) {
    res.status(404).json({ error: -2, descripcion: `ruta '${req.url}' metodo ${req.method} no implementado` })
}

// revisa si los archivos existen
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
    validarAdmin,
    validarRuta,
    validarArchivo,
    pathCarrito,
    pathProductos
};