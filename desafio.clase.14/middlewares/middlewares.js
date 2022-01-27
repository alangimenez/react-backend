const fs = require('fs');
const admin = true;

function validarCarrito(req, res, next) {
    const { idCarr, idProd } = req.params;
    const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    const carrito = JSON.parse(carritoPrevio);
    const productosPrevio = fs.readFileSync('./assets/productos.txt', 'utf-8');
    const productos = JSON.parse(productosPrevio);

    // validación idCarrito mayor al id del ultimo carrito
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
    const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    const carrito = JSON.parse(carritoPrevio);

    // validación idCarrito mayor al id del ultimo carrito
    if (idCarr > carrito[carrito.length - 1].id || idCarr < 0) return res.status(404).json('El carrito buscado no existe')

    // validación idCarrito exista en el array
    const carrFiltrado = carrito.filter(e => e.id == +idCarr)
    if (carrFiltrado == "") return res.json("el carrito buscado no existe validacion 2")

    // validación idProducto exista en idCarrito
    const prodFiltrado = carrFiltrado[0].producto.filter(f => f.id == +idProd)
    if (prodFiltrado == "") return res.json('el producto buscado no existe en el carrito')

    next();
}

// validacion si es admin o no
function validarAdmin (req, res, next) {
    if (admin == false) return res.status(401).json('Ud no posee permiso para acceder a esta sección');
    next();
}

module.exports = {validarCarrito, validarDelete, validarAdmin};