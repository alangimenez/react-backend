const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();

class OrderController {
    constructor() { }

    async crearOrden(req, productos, total) {
        try {
            return await repository.crearNuevaOrden(req.session.user.id, productos, total, req.session.user.direccion);
        } catch (e) {
            error.errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async cambiarEstado(req, res) {
        try {
            res.status(201).json(await repository.cambiarEstadoOrden(req.params.idOrd, req.body.status));
        } catch (e) {
            error.errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async obtenerPedidos(req, res) {
        try {
            res.status(200).json(await repository.obtenerPedidos(req.session.user.rol, req.session.user.id));
        } catch (e) {
            error.errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    

    async obtenerPedidosFiltrados (req, res) {
        try {
            return res.status(200).json(await repository.obtenerPedidosPorStatus(+req.params.status));
        } catch (e) {
            error.errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }
}



module.exports = {
    OrderController,
}