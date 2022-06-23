const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { fnCarritos, fnProductos } = require('../persistencia/factory');

class CartMid {
    constructor() { }

    // valida que exista un usuario logueado
    validarSesion(req, res, next) {
        try {
            if (!req.session.user) {
                return error.errorResponse(401, "middlewareError", "Por favor, primero debe loguearse para esta petición", res);
            }
            next();
        } catch {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación de sesión -> " + e.message, res);
        }
    }

    // validar que el nombre del usuario sea ingresado y que sea en formato string
    validarUser(req, res, next) {
        try {
            if (!req.body.name) {
                return error.errorResponse(400, "middlewareError", "Por favor, introduzca un usuario valido", res);
            };
            if (typeof (req.body.name) != "string") {
                return error.errorResponse(400, "middlewareError", "Por favor, introduzca un usuario en formato string", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del usuario -> " + e.message, res);
        }
    }

    // valida que el carrito exista
    async validarCarrito(req, res, next) {
        try {
            const carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            if (carrito.length === 0) {
                return error.errorResponse(400, "middlewareError", "El carrito buscado no se encuentra", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del carrito -> " + e.message, res);
        }
    }

    // valida que el producto que se busca en un carrito
    // 1) sea en formato numero
    // 2) exista en el carrito
    // 3) a su vez, se valida que el carrito no este vacio
    async validarProductoEnCarrito(req, res, next) {
        try {
            if (isNaN(req.params.idProd)) {
                return error.errorResponse(400, "middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
            }
            const carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            if (carrito[0].productos.length === 0) return error.errorResponse(404, "middlewareError", "El carrito esta vacio", res);
            const prodEnCarrito = carrito[0].productos.find(e => e.id === +req.params.idProd);
            if (!prodEnCarrito) {
                return error.errorResponse(404, "middlewareError", "El producto no se encuentra en el carrito", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando si existe el producto en el carrito -> " + e.message, res);
        }
    }

    // valida que la cantidad que se desea modificar, sea un numero mayor a 0
    validarUnidadesProductos(req, res, next) {
        try {
            if (isNaN(req.body.cantidad) || req.body.cantidad < 1) {
                return error.errorResponse(400, "middlewareError", "Cantidad ingresada incorrecta, por favor, ingrese una cantidad numerica mayor a cero", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando las unidades del producto -> " + e.message, res);
        }
    }

    // validar que el carrito no este vacio para hacer una compra
    async validarCarritoConProductos(req, res, next) {
        try {
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(req.session.user.cart);
            if (carritoSeleccionado[0].productos.length === 0) {
                return error.errorResponse(400, "middlewareError", "Para realizar una compra, el carrito no debe estar vacio", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando si existen productos en el carrito -> " + e.message, res);
        }
    }

    // valida que exista stock suficiente antes de agregar mas unidades a un carrito de un producto
    async validarStockActual(req, res, next) {
        try {
            const producto = await fnProductos().leerInfoPorId(+req.params.idProd);
            if (producto[0].stock < +req.body.cantidad) {
                return error.errorResponse(400, "middlewareError", `No existe stock suficiente para cubrir este eventual pedido. Stock disponible: ${producto[0].stock}. Stock que solicitaría: ${+req.body.cantidad}`, res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando si existe actualmente stock para la cantidad solicitada -> " + e.message, res);
        }
    }

    // valida que exista al menos un dato de perfil para actualizar, y que si es la dirección, sea en formato string
    validarDatosActualizacion(req, res, next) {
        try {
            if (!req.body.direccion && !req.body.telefono) {
                return error.errorResponse(400, "middlewareError", `Por favor, ingrese su dirección o telefono para actualizar`, res);
            }
            if (req.body.direccion) {
                if (typeof (req.body.direccion) != "string") {
                    return error.errorResponse(400, "middlewareError", `La direccion ingresada debe ser en formato string`, res);
                }
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando los datos de perfil a actualizar -> " + e.message, res);
        }
    }
}

module.exports = {
    CartMid,
}