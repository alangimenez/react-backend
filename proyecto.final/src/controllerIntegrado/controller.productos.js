const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();
const { ErrorHandler } = require('../error/error');
const { fnProductos } = require('../persistencia/factory');
const error = new ErrorHandler();

class ProductController {
    constructor() { }

    // muestra todos los productos
    async obtenerProductos(req, res) {
        try {
            const productos = await repository.obtenerTodosLosProductos();
            if (req.user) {
                res.render('../views/productos', { listaProductos: productos, isActive: req.session.user.id, boton: "Cerrar sesión", user: req.session.user.id, logout: 'logout' });
            } else {
                res.render('../views/productos', { listaProductos: productos, boton: "Iniciar sesión", login: 'login' });
            }
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador "Producto - Obtener Productos" ha tenido un error -> ` + e.message, res);
        }
    }

    // muestra un producto
    async obtenerProductoPorId(req, res) {
        try {
            const producto = await repository.obtenerProductPorId(+req.params.idProd);
            if (req.user) {
                res.render('../views/productoIndividual', { objeto: producto, isActive: req.session.user.id, boton: "Cerrar sesión", user: req.session.user.id });
            } else {
                res.render('../views/productoIndividual', { objeto: producto, boton: "Iniciar sesión", user: "na" });
            }
        } catch (e) {
            return error.errorResponse("controllerError", `El controlador "Producto" ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina un producto, muestra array completo de productos
    async eliminarProducto(req, res) {
        try {
            res.status(201).json(await repository.eliminarProductPorId(+req.params.idProd))
        } catch (e) {
            return error.errorResponse("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // incorpora nuevo producto, lo muestra
    async subirProducto(req, res) {
        try {
            res.status(201).json(await repository.subirNuevoProducto(req.body));
        } catch (e) {
            return error.errorResponse("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // modifica un producto, lo muestra
    async modificarProducto(req, res) {
        try {
            res.status(201).json(await repository.actualizarProductoPorId(+req.params.idProd, req.body))
        } catch (e) {
            return error.errorResponse("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async obtenerProductoPorCategoria(req, res) {
        try {
            const productos = await repository.traerProductosPorCategoria(req.params.cat);
            if (req.user) {
                res.render('../views/productos', { listaProductos: productos, isActive: req.session.user.id, boton: "Cerrar sesión", user: req.session.user.id, logout: 'logout' });
            } else {
                res.render('../views/productos', { listaProductos: productos, boton: "Iniciar sesión", login: 'login' });
            }
        }
        catch (e) {
            return error.errorResponse("controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

}

module.exports = {
    ProductController,
}