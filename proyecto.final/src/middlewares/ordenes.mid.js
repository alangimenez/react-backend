const { errorResponse } = require('../error/error.response');
const { fnProductos, fnOrdenes, fnCarritos } = require('../persistencia/factory');

class OrderMid {
    constructor() { }

    // revisa si es admin o no
    validarStatus(req, res, next) {
        try {
            if (req.body.status <= 0 || req.body.status >= 4 || isNaN(req.body.status)) {
                return errorResponse(403, "middlewareError", "Status incorrecto. Solo se puede establecer status 1 (en preparacion), 2 (despachado) o 3 (entregado)", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del status -> " + e.message, res);
        }
    }

    async validarStock(req, res, next) {
        try {
            let error = "";
            const carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            const productos = await fnProductos().leerInfo();
            for (let i = 0; i < carrito[0].productos.length; i++) {
                const stockProducto = productos.find(e => e.id === carrito[0].productos[i].id)
                if (stockProducto) {
                    if (carrito[0].productos[i].cantidad > stockProducto.stock) {
                        error = error + `No existe stock suficiente del producto ${carrito[0].productos[i].nombre}. 
                    Stock disponible: ${stockProducto.stock}. Stock solicitado: ${carrito[0].productos[i].cantidad}  `
                    }
                }
            }
            if (error != "") {
                return errorResponse(400, "middlewareError", "Stock insuficiente. " + error, res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del status de la orden-> " + e.message, res);
        }
    }

    async validarOrder (req, res, next) {
        try {
            if (isNaN(+req.params.idOrd)) {
                return errorResponse(400, "middlewareError", "Por favor, introduzca una orden en formato number", res);
            }
            const orden = await fnOrdenes().leerInfoPorId(+req.params.idOrd);
            if(orden.length === 0) {
                return errorResponse(400, "middlewareError", "La orden que se intenta actualizar no existe. ", res);
            }
            next();
        } catch (e) {
            return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación de la orden -> " + e.message, res);
        }
    }
}

module.exports = {
    OrderMid,
}