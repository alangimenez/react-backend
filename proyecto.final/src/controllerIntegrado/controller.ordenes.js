const { fnOrdenes, fnProductos } = require('../persistencia/factory');
const { errorResponse } = require('../error/error.response');
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();

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
            let ordenes = "";
            if (req.session.user.rol === "admin") {
                ordenes = await fnOrdenes().leerInfo();
            } else {
                ordenes = await fnOrdenes().leerInfoPorUser(req.session.user.id);
            }
            ordenes = ordenes.map(i => i.toObject());
            if (req.session.user.rol === "admin") {
                res.render('../views/ordenes', {
                    ordenes: ordenes,
                    isActive: req.session.user.id,
                    boton: "Logout",
                    admin: "true"
                })
            } else {
                res.render('../views/ordenes', {
                    ordenes: ordenes,
                    isActive: req.session.user.id,
                    boton: "Logout"
                })
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

    async obtenerPedidosFiltrados (req, res) {
        try {
            let ordenes = await repository.obtenerPedidosPorStatus(+req.params.status);
            ordenes = ordenes.map(i => i.toObject());
            res.render('../views/ordenes', {
                ordenes: ordenes,
                isActive: req.session.user.id,
                boton: "Logout",
                admin: "true"
            })
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }
}



module.exports = {
    OrderController,
}