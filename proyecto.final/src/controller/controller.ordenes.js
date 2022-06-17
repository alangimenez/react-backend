const { fnOrdenes } = require('../persistencia/factory');
const { errorResponse } = require('../error/error.response');

class OrderController {
    constructor() { }

    async crearOrden(req, productos, total) {
        try {
            const lista = await fnOrdenes().leerInfo();
            let idNuevo = 0;
            lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;

            const orden = {
                id: idNuevo,
                user: req.session.user.id,
                fechaDePedido: Date.now(),
                productos: productos,
                total: total,
                status: "En preparación",
                fechaDeEntregado: "",
                direccion: req.session.user.direccion
            }
            const nuevaOrden = await fnOrdenes().subirInfo(orden);
            return orden;
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    cambiarEstado(req, res) {
        try {

        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    obtenerPedidos(req, res) {
        try {

        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }
}



module.exports = {
    OrderController,
}