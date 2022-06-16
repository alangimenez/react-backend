const admin = true;
const fs = require('fs');
const { logger, errorLogger } = require('../config/config.log4js');
const { errorResponse } = require('../error/error.response');
const { fnProductos } = require('../persistencia/factory');

// revisa si es admin o no
function validarAdmin(req, res, next) {
    if (admin === false) {
        return errorResponse(401, "middlewareError", "El usuario no posee permisos de administrador -> " + e.message, res);
    }
    next();
}

async function validarProducto(req, res, next) {
    try {
        if (isNaN(req.params.idProd)) {
            return errorResponse(400, "middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
        }
        const producto = await fnProductos().leerInfoPorId(+req.params.idProd);
        if(producto.length === 0) {
            return errorResponse(404, "middlewareError", "El producto buscado no se encuentra", res);
        } 
        next();
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del producto -> " + e.message, res);
    }
}

function validarAtributosProducto (req, res, next) {
    try {
        if ((!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.precio || !req.body.stock) && req.method === "POST") {
            return errorResponse(400, "middlewareError", "Debe completar todas las propiedades del productos", res);
        }
        if ((!req.body.nombre && !req.body.descripcion && !req.body.codigo && !req.body.foto && !req.body.precio && !req.body.stock) && req.method === "PUT") {
            return errorResponse(400, "middlewareError", `Las caracteristicas que se intentan actualizar del producto no existen`, res);
        }
        if (req.body.nombre) {
            if (typeof(req.body.nombre) != "string") {
                return errorResponse(400, "middlewareError", "Por favor, introduzca un nombre en formato string", res);
            } 
        }
        if (req.body.descripcion) {
            if (typeof(req.body.descripcion) != "string") {
                return errorResponse(400, "middlewareError", "Por favor, introduzca una descripcion en formato string", res);
            } 
        }
        if (req.body.codigo) {
            if (typeof(req.body.codigo) != "number") {
                return errorResponse(400, "middlewareError", "Por favor, introduzca un código en formato number", res);
            } 
        }
        if (req.body.precio) {
            if (typeof(req.body.precio) != "number") {
                return errorResponse(400, "middlewareError", "Por favor, introduzca un precio en formato number", res);
            } 
        }
        if (req.body.stock) {
            if (typeof(req.body.stock) != "number") {
                return errorResponse(400, "middlewareError", "Por favor, introduzca un stock en formato number", res);
            } 
        }
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error validando los atributos del producto -> " + e.message, res);
    }
    next();
}

/* function controlProducto(req, res, next) {
    const { idProd } = req.params;
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        const productos = JSON.parse(data);

        const result = productos.findIndex(e => e.id === +idProd);
        if (result === -1) {
            errorLogger.error(`El producto solicitado no existe`);
            return res.status(404).json({ error: -5, message: `El producto solicitado no existe` });
        }

        next();
    })
} */

/* // para endpoint POST producto
function validarProduct(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
        errorLogger.error(`No ha completado todos los campos necesarios del producto`)
        return res.status(400).json({ error: -6, message: `No ha completado todos los campos necesarios del producto` })
    }
    next();
}

function controlPropProducto(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) {
        errorLogger.error(`Las caracteristicas que se intentan actualizar del producto no existen`)
        return res.status(400).json({ error: -7, message: `Las caracteristicas que se intentan actualizar del producto no existen` })
    }
    next();
} */

module.exports = {
    validarAtributosProducto,
    validarProducto, 
    validarAdmin
}