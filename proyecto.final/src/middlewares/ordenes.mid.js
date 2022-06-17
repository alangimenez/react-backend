const { logger, errorLogger } = require('../config/config.log4js');
const { errorResponse } = require('../error/error.response');
const { fnProductos, fnOrdenes, fnCarritos } = require('../persistencia/factory');

// revisa si es admin o no
function validarStatus(req, res, next) {
    try {
        if (req.body.status <= 0 || req.body.status >= 4 || isNaN(req.body.status)) {
            return errorResponse(403, "middlewareError", "Status incorrecto. Solo se puede establecer status 1 (en preparacion), 2 (despachado) o 3 (entregado)", res);
        }
        next();
    } catch (e) {
        return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del status -> " + e.message, res);
    }
}

async function validarStock(req, res, next) {
    try {
        let error = "";
        const carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
        const productos = await fnProductos().leerInfo();
        for (let i = 0; i < carrito[0].productos.length; i++) {
            const stockProducto = productos.find(e => e.id === carrito[0].productos[i].id)
            if (stockProducto) {
                if(carrito[0].productos[i].cantidad > stockProducto.stock) {
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
        return errorResponse(500, "middlewareError", "Ha ocurrido un error en la validación del status -> " + e.message, res);

    }
}

module.exports = {
    validarStatus,
    validarStock,
}