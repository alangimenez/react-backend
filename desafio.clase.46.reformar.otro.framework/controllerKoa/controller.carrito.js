const { Repository } = require('../persistencia/repository/reporitoryMongo');
const repository = new Repository();
const { error } = require('../errorKoa/error');
const { fnCarritos } = require('../persistencia/factory');
const { Controls } = require('../controlKoa/controlKoa');
const control = new Controls();

class CarritoKoaController {
    constructor(){}

    // retorna todos los carritos. Terminado el proyecto, ELIMINARLO porque no es parte de la consigna
    async obtenerTodosLosCarritos(ctx) {
        try {
            ctx.response.status = 200;
            ctx.body = await fnCarritos().leerInfo();
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // crea carrito, muestra objeto
    async crearCarrito(ctx) {
        try {
            ctx.response.status = 201;
            ctx.body = await repository.nuevoCarrito(ctx.request.body.username);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // elimina carrito, muestra array completo
    async eliminarCarrito(ctx) {
        try {
            const result = await control.validarCarrito(ctx);
            if (result) {
                    ctx.response.status = 400;
                    ctx.body = result;
                    return
            }
            ctx.response.status = 201;
            ctx.body = await fnCarritos().eliminarInfo(+ctx.params.idCarr);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // inserta productos en carrito, muestra el carrito seleccionado completo
    async prodAlCarrito(ctx) {
        try {
            const result0 = await control.validarCarrito(ctx);
            if (result0) {
                    ctx.response.status = 400;
                    ctx.body = result0;
                    return
            }
            const result = await control.validarProducto(ctx);
            if (result) {
                    ctx.response.status = 400;
                    ctx.body = result;
                    return
            }
            ctx.response.status = 201;
            ctx.body = await repository.agregarProductosAlCarrito(+ctx.params.idCarr, +ctx.params.idProd);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // lista todos los productos de un carrito
    async prodDelCarrito(ctx) {
        try {
            const result0 = await control.validarCarrito(ctx);
            if (result0) {
                    ctx.response.status = 400;
                    ctx.body = result0;
                    return
            }
            ctx.response.status = 201;
            const carritoSeleccionado = await repository.obtenerProductosDelCarrito(+ctx.params.idCarr);
            ctx.body = carritoSeleccionado.productos;
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

    // elimina productos del carrito, muestra listado de productos del carrito
    async elimProdDelCarrito(ctx) {
        try {
            const result0 = await control.validarCarrito(ctx);
            if (result0) {
                    ctx.response.status = 400;
                    ctx.body = result0;
                    return
            }
            const result = await control.validarProductoEnCarrito(ctx);
            if (result) {
                    ctx.response.status = 400;
                    ctx.body = result;
                    return
            }
            ctx.response.status = 201;
            ctx.body = await repository.eliminarProductosDelCarrito(+ctx.params.idCarr, +ctx.params.idProd);
        } catch (e) {
            return error("controllerError", `El controlador ha tenido un error -> ` + e.message, ctx);
        }
    }

}

module.exports = {
    CarritoKoaController,
}