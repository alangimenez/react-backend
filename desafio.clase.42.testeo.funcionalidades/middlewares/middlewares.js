const admin = true;
const { leerArchivo } = require('../persistencia/fileSystem');
const pathCarrito = './assets/carrito.txt';
const pathProductos = './assets/productos.txt';
const { warningLogger, errorLogger } = require('../config/log4js');
const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { error } = require('../error/error');

class Middlewares {
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

    async validarCarrito(req, res, next) {
        try {
            if (isNaN(req.params.idCarr)) {
                return error("middlewareError", "Por favor, introduzca un identificador de carrito en formato numero", res);
            }
            const carrito = await fnCarritos().leerInfoPorId(+req.params.idCarr);
            if (carrito.length === 0) {
                return error("middlewareError", "El carrito buscado no se encuentra", res);
            }
            next();
        } catch (e) {
            return error("middlewareError", "Ha ocurrido un error en la validación del carrito", res);
        }
    }

    async validarProducto(req, res, next) {
        try {
            if (isNaN(req.params.idProd)) {
                return error("middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
            }
            const producto = await fnProductos().leerInfoPorId(+req.params.idProd);
            if (producto.length === 0) {
                return error("middlewareError", "El producto buscado no se encuentra", res);
            }
            next();
        } catch (e) {
            return error("middlewareError", "Ha ocurrido un error en la validación del producto", res);
        }
    }

    async validarProductoEnCarrito(req, res, next) {
        try {
            if (isNaN(req.params.idProd)) {
                return error("middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
            }
            const carrito = await fnCarritos().leerInfoPorId(+req.params.idCarr);
            if (carrito[0].productos.length === 0) return error("middlewareError", "El carrito esta vacio", res);
            const prodEnCarrito = carrito[0].productos.find(e => e.id === +req.params.idProd);
            if (!prodEnCarrito) {
                return error("middlewareError", "El producto no se encuentra en el carrito", res);
            }
            next();
        } catch (e) {
            return error("middlewareError", "Ha ocurrido un error validando si existe el producto en el carrito", res);
        }
    }

    validarAtributosProducto(req, res, next) {
        try {
            if ((!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) && req.method === "POST") {
                return error("middlewareError", "Debe completar todas las propiedades del productos", res);
            }
            if ((!req.body.nombre && !req.body.descripcion && !req.body.codigo && !req.body.foto && !req.body.precio && !req.body.stock) && req.method === "PUT") {
                return error("middlewareError", `Las caracteristicas que se intentan actualizar del producto no existen`, res);
            }
            if (req.body.nombre) {
                if (typeof (req.body.nombre) != "string") {
                    return error("middlewareError", "Por favor, introduzca un nombre en formato string", res);
                }
            }
            if (req.body.descripcion) {
                if (typeof (req.body.descripcion) != "string") {
                    return error("middlewareError", "Por favor, introduzca una descripcion en formato string", res);
                }
            }
            if (req.body.codigo) {
                if (typeof (req.body.codigo) != "number") {
                    return error("middlewareError", "Por favor, introduzca un código en formato number", res);
                }
            }
            if (req.body.precio) {
                if (typeof (req.body.precio) != "number") {
                    return error("middlewareError", "Por favor, introduzca un precio en formato number", res);
                }
            }
            if (req.body.stock) {
                if (typeof (req.body.stock) != "number") {
                    return error("middlewareError", "Por favor, introduzca un stock en formato number", res);
                }
            }
            if (req.body.foto) {
                if (typeof (req.body.foto) != "string") {
                    return error("middlewareError", "Por favor, introduzca un enlace a la foto en formato string", res);
                }
            }
        } catch (e) {
            return error("middlewareError", "Ha ocurrido un error validando los atributos del producto", res);
        }
        next();
    }
}

module.exports = {
    Middlewares,
}