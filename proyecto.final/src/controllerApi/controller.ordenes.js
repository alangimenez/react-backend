const { fnOrdenes, fnProductos } = require('../persistencia/factory');
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
                productos: productos,
                total: total,
                status: "En preparación",
                fechaDePedido: Date.now(),
                fechaDeDespacho: "",
                fechaDeEntregado: "",
                direccion: req.session.user.direccion
            }

            this.modificarStock(orden);

            const nuevaOrden = await fnOrdenes().subirInfo(orden);
            return orden;
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async cambiarEstado(req, res) {
        try {
            const order = req.params.idOrd;
            let ordenActualizada;
            switch (req.body.status) {
                case 1:
                    ordenActualizada = await fnOrdenes().actualizarStatusPreparacionDespachado(order, "En preparacion", "", "");
                    break;
                case 2:
                    ordenActualizada = await fnOrdenes().actualizarStatusPreparacionDespachado(order, "Despachado", Date.now(), "");
                    break;
                case 3:
                    ordenActualizada = await fnOrdenes().actualizarStatusEntregado(order, "Entregado", Date.now());
                    break;
                default:
                    break;
            }
            res.status(201).json(ordenActualizada);
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async obtenerPedidos(req, res) {
        try {
            if (req.session.user.rol === "admin") {
                const ordenes = await fnOrdenes().leerInfo();
                res.status(200).json(ordenes);
            } else {
                const ordenes = await fnOrdenes().leerInfoPorUser(req.session.user.id);
                res.status(200).json(ordenes);
            }

        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async modificarStock(orden) {
        const productos = await fnProductos().leerInfo();
        for (let i = 0; i < orden.productos.length; i++) {
            const stockProducto = productos.find(e => e.id === orden.productos[i].id)
            if (stockProducto) {
                const nuevoStock = stockProducto.stock - orden.productos[i].cantidad;
                await fnProductos().actualizarStockProducto(stockProducto.id, nuevoStock);
            }
        }
    }
}



module.exports = {
    OrderController,
}