const { errorResponse } = require('../error/error.response');
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { fnProductos } = require('../persistencia/factory');

class ProdMid {
    constructor() { }

    // revisa si es admin o no
    validarAdmin(req, res, next) {
        try {
            if (req.session.user.rol != "admin") {
                return error.errorResponse(403, "middlewareError", "El usuario no posee permisos de administrador", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del producto -> " + e.message, res);
        }
    }

    // valida que el id del producto sea en formato numero, y que exista el mismo
    async validarProducto(req, res, next) {
        try {
            if (isNaN(req.params.idProd)) {
                return error.errorResponse(400, "middlewareError", "Por favor, introduzca un identificador de producto en formato numero", res);
            }
            const producto = await fnProductos().leerInfoPorId(+req.params.idProd);
            if (producto.length === 0) {
                return error.errorResponse(404, "middlewareError", "El producto buscado no se encuentra", res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del producto -> " + e.message, res);
        }
    }

    // valida que los atributos del producto existan, y que tengan el formato correcto
    validarAtributosProducto(req, res, next) {
        try {
            if ((!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.precio || !req.body.stock || !req.body.categoria) && req.method === "POST") {
                return error.errorResponse(400, "middlewareError", "Debe completar todas las propiedades del productos. Propiedades: nombre, descripción, codigo, precio, stock, categoria", res);
            }
            if ((!req.body.nombre && !req.body.descripcion && !req.body.codigo && !req.body.foto && !req.body.precio && !req.body.stock && !req.body.categoria) && req.method === "PUT") {
                return error.errorResponse(400, "middlewareError", `Las caracteristicas que se intentan actualizar del producto no existen`, res);
            }
            if (req.body.nombre) {
                if (typeof (req.body.nombre) != "string") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca un nombre en formato string", res);
                }
            }
            if (req.body.descripcion) {
                if (typeof (req.body.descripcion) != "string") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca una descripcion en formato string", res);
                }
            }
            if (req.body.codigo) {
                if (typeof (req.body.codigo) != "number") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca un código en formato number", res);
                }
            }
            if (req.body.precio) {
                if (typeof (req.body.precio) != "number") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca un precio en formato number", res);
                }
            }
            if (req.body.stock) {
                if (typeof (req.body.stock) != "number") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca un stock en formato number", res);
                }
            }
            if (req.body.categoria) {
                if (typeof (req.body.categoria) != "string") {
                    return error.errorResponse(400, "middlewareError", "Por favor, introduzca una categoria en formato string", res);
                }
            }
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando los atributos del producto -> " + e.message, res);
        }
        next();
    }

    // valida que la categoria exista
    validarCategoria(req, res, next) {
        try {
            const categoria = ["comedia", "accion", "drama"];
            let insertar = "";
            let bool = false;
            for (let i = 0; i < categoria.length; i++) {
                if (categoria[i] === req.params.cat) {
                    bool = true;
                    break;
                }
                insertar = insertar + categoria[i] + ", ";
            }
            if (!bool) {
                return error.errorResponse(400, "middlewareError", "Por favor, introduzca una categoria valida. Solo son posibles las categorias: " + insertar, res);
            }
            next();
        } catch (e) {
            return error.errorResponse(500, "middlewareError", "Ha ocurrido un error validando los atributos del producto -> " + e.message, res);
        }
    }
}

module.exports = {
    ProdMid,
}