const { Repository } = require('../persistencia/repository/reporitoryMongo');
const repository = new Repository();
const { error } = require('../errorKoa/error');

class ControllerKoaProduct {
    constructor() { }

    // muestra todos los productos
    async obtenerProductos(ctx) {
        try {
            ctx.response.status = 200;
            ctx.body = await repository.obtenerTodosLosProductos();
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // muestra un producto
    async obtenerProductoPorId(ctx) {
        try {
            ctx.response.status = 200;
            ctx.body = await repository.obtenerProductPorId(+ctx.params.idProd);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // elimina un producto, muestra array completo de productos
    async eliminarProducto(ctx) {
        try {
            ctx.response.status = 201;
            ctx.body = await repository.eliminarProductPorId(+ctx.params.idProd);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // incorpora nuevo producto, lo muestra
    async subirProducto(ctx) {
        try {
            ctx.response.status = 201;
            ctx.body = await repository.subirNuevoProducto(ctx.request.body);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // modifica un producto, lo muestra
    async modificarProducto(ctx) {
        try {
            ctx.response.status = 201;
            ctx.body = await repository.actualizarProductoPorId(+ctx.params.idProd, ctx.request.body);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }
}

module.exports = {
    ControllerKoaProduct
}