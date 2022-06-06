const admin = true;
const { leerArchivo } = require('../persistencia/fileSystem');
const pathCarrito = './assets/carrito.txt';
const pathProductos = './assets/productos.txt';
const { warningLogger, errorLogger } = require('../config/log4js');
const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { error } = require('../errorKoa/error');

class Controls {
    constructor() { }

    // revisa si es admin o no
    validarAdmin(req, res, next) {
        if (admin === false) {
            return error("middlewareError", `El usuario no posee permisos de administrador`, res);

        }
        next();
    }

    // error si no existe ruta
    validarRuta(req, res, next) {
        // console.log(req);
        warningLogger.warn(`Peticion incorrecta a ${req.baseUrl}, metodo ${req.method}`)
        res.status(404).json({ error: -2, descripcion: `ruta '${req.url}' metodo ${req.method} no implementado` })
    }

    // revisa si los archivos existen
    validarArchivo(req, res, next) {
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

    controlPropProducto(req, res, next) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) {
            return error("middlewareError", `Las caracteristicas que se intentan actualizar del producto no existen`, res);
        }
        next();
    }

    validarUser(req, res, next) {
        try {
            if (!req.body.name) {
                return error("middlewareError", "Por favor, introduzca un usuario valido", res);
            };
            if (typeof (req.body.name) != "string") {
                return error("middlewareError", "Por favor, introduzca un usuario en formato string", res);
            }
            next();
        } catch (e) {
            return error("middlewareError", "Ha ocurrido un error en la validación del usuario", res);
        }
    }

    async validarCarrito(ctx) {
        try {
            /* if (isNaN(ctx.params.idCarr)) {
                return {type: "middlewareError", message: "Por favor, introduzca un identificador de carrito en formato numero"};
            } */
            const carrito = await fnCarritos().leerInfoPorId(ctx.params.idCarr);
            if (carrito.length === 0) {
                return {type: "middlewareError", message: "El carrito buscado no se encuentra"};
            }
        } catch (e) {
            return {type: "middlewareError", message: /* "Ha ocurrido un error en la validación del carrito" */e.message};
        }
    }

    async validarProducto(ctx) {
        try {
            if (isNaN(ctx.params.idProd)) {
                return {type: "middlewareError", message: "Por favor, introduzca un identificador de producto en formato numero"};
            }
            const producto = await fnProductos().leerInfoPorId(+ctx.params.idProd);
            if (producto.length === 0) {
                return {type: "middlewareError", message: "El producto buscado no se encuentra"};
            }
        } catch (e) {
            return {type: "middlewareError", message: "Ha ocurrido un error en la validación del producto"};
        }
    }

    async validarProductoEnCarrito(ctx) {
        try {
            if (isNaN(+ctx.params.idProd)) {
                return {type: "middlewareError", message: "Por favor, introduzca un identificador de producto en formato numero"};
            }
            const carrito = await fnCarritos().leerInfoPorId(ctx.params.idCarr);
            if (carrito[0].productos.length === 0) return {type: "middlewareError", message: "El carrito esta vacio"};
            const prodEnCarrito = carrito[0].productos.find(e => e.id === +ctx.params.idProd);
            if (!prodEnCarrito) {
                return {type: "middlewareError", message: "El producto no se encuentra en el carrito"};
            }
        } catch (e) {
            return {type: "middlewareError", message: e.message};
        }
    }

    validarAtributosProducto(ctx) {
        try {
            if ((!ctx.request.body.nombre || !ctx.request.body.descripcion || !ctx.request.body.codigo || !ctx.request.body.foto || !ctx.request.body.precio || !ctx.request.body.stock) && ctx.request.method === "POST") {
                return {type: "middlewareError", message: "Debe completar todas las propiedades del productos"};
            }
            if ((!ctx.request.body.nombre && !ctx.request.body.descripcion && !ctx.request.body.codigo && !ctx.request.body.foto && !ctx.request.body.precio && !ctx.request.body.stock) && ctx.request.method === "PUT") {
                return {type: "middlewareError", message: `Las caracteristicas que se intentan actualizar del producto no existen`};
            }
            if (ctx.request.body.nombre) {
                if (typeof (ctx.request.body.nombre) != "string") {
                    return {type: "middlewareError", message: "Por favor, introduzca un nombre en formato string"};
                }
            }
            if (ctx.request.body.descripcion) {
                if (typeof (ctx.request.body.descripcion) != "string") {
                    return {type: "middlewareError", message: "Por favor, introduzca una descripcion en formato string"};
                }
            }
            if (ctx.request.body.codigo) {
                if (typeof (ctx.request.body.codigo) != "number" || ctx.request.body.codigo <= 0) {
                    return {type: "middlewareError", message: "Por favor, introduzca un código en formato number mayor a 0"};
                }
            }
            if (ctx.request.body.precio) {
                if (typeof (ctx.request.body.precio) != "number" || ctx.request.body.precio <= 0) {
                    return {type: "middlewareError", message: "Por favor, introduzca un precio en formato number mayor a 0"};
                }
            }
            if (ctx.request.body.stock) {
                if (typeof (ctx.request.body.stock) != "number" || ctx.request.body.stock <= 0) {
                    return {type: "middlewareError", message: "Por favor, introduzca un stock en formato number mayor a 0"};
                }
            }
            if (ctx.request.body.foto) {
                if (typeof (ctx.request.body.foto) != "string") {
                    return {type: "middlewareError", message: "Por favor, introduzca un enlace a la foto en formato string"};
                }
            }
        } catch (e) {
            return {type: "middlewareError", message: "Ha ocurrido un error validando los atributos del producto"};
        }
    }
}

module.exports = {
    Controls,
}