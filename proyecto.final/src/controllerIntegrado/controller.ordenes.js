const { fnOrdenes, fnProductos } = require('../persistencia/factory');
const { errorResponse } = require('../error/error.response');
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();

class OrderController {
    constructor() { }

    async crearOrden(req, productos, total) {
        try {
            return await repository.crearNuevaOrden(req.session.user.id, productos, total, req.session.user.direccion);
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async cambiarEstado(req, res) {
        try {
            res.status(201).json(await repository.cambiarEstadoOrden(req.params.idOrd, req.body.status));
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async obtenerPedidos(req, res) {
        try {
            const ordenes = await repository.obtenerPedidos(req.session.user.rol, req.session.user.id);
            ordenes = ordenes.map(i => i.toObject());
            if (req.session.user.rol === "admin") {
                res.render('../views/ordenes', {
                    ordenes: ordenes,
                    isActive: req.session.user.id,
                    boton: "Logout",
                    admin: "true",
                    title: "Mis ordenes"
                })
            } else {
                res.render('../views/ordenes', {
                    ordenes: ordenes,
                    isActive: req.session.user.id,
                    boton: "Logout",
                    title: "Mis ordenes"
                })
            }
            

        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
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
                admin: "true",
                title: "Mis pedidos"
            })
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }
}



module.exports = {
    OrderController,
}