const fs = require('fs');
const admin = true;
const { leerArchivo, escribirArchivo } = require('../persistencia/fileSystem');
const { pathProductos } = require('../controller/controller.productos')

function validarCarrito(req, res, next) {
    const { idCarr, idProd } = req.params;
    const carrito = leerArchivo('./assets/carrito.txt');
    const productos = leerArchivo('./assets/productos.txt');

    /*const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    const carrito = JSON.parse(carritoPrevio);
    const productosPrevio = fs.readFileSync('./assets/productos.txt', 'utf-8');
    const productos = JSON.parse(productosPrevio);*/

    // validación idCarrito mayor al id del ultimo carrito
    // esta validacion podria eliminarse y dejar solo la segunda y tercera??
    if (idCarr > carrito[carrito.length - 1].id || idCarr < 0) return res.status(404).json('El carrito buscado no existe')

    // validación idCarrito exista en el array
    const carrFiltrado = carrito.filter(e => e.id == +idCarr)
    if (carrFiltrado == "") return res.json("el carrito buscado no existe validacion 2")

    // validacion idProd exista dentro de los productos en listado
    const prodFiltrado = productos.filter(f => f.id == +idProd)
    if (prodFiltrado == "") return res.json('El producto que se intenta agregar no existe')
    next();
}

function validarDelete(req, res, next) {
    const { idCarr, idProd } = req.params;

    const carrito = leerArchivo('./assets/carrito.txt');

    /*
    const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    const carrito = JSON.parse(carritoPrevio);*/

    // validación idCarrito mayor al id del ultimo carrito
    // esta validacion capaz pueda eliminarse dejando solo la segunda
    if (idCarr > carrito[carrito.length - 1].id || idCarr < 0) return res.status(404).json('El carrito buscado no existe')

    // validación idCarrito exista en el array
    const carrFiltrado = carrito.filter(e => e.id == +idCarr)
    if (carrFiltrado == "") return res.json("el carrito buscado no existe validacion 2")

    // validacion si carrito tiene productos
    if (carrFiltrado.producto == undefined) return res.json("el carrito buscado no contiene productos")

    // validación idProducto exista en idCarrito
    const prodFiltrado = carrFiltrado[0].producto.filter(f => f.id == +idProd)
    if (prodFiltrado == "") return res.json('el producto buscado no existe en el carrito')

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
        const dato = leerArchivo(pathProductos);
    }
    catch (e) {
        console.log(e.message)
        return res.status(404).json({ error: -3, message: `El archivo que se busca leer no existe o esta vacio.` })
    }
    next();
}

module.exports = { validarCarrito, validarDelete, validarAdmin, validarRuta, validarArchivo };