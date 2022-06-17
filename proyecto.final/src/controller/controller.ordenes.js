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
                productos: productos,
                total: total,
                status: "En preparación",
                fechaDePedido: Date.now(),
                fechaDeDespacho: "",
                fechaDeEntregado: "",
                direccion: req.session.user.direccion
            }
            const nuevaOrden = await fnOrdenes().subirInfo(orden);
            return orden;
        } catch (e) {
            errorResponse(500, "Ha ocurrido un error en el OrderController ", e.message, res);
        }
    }

    async cambiarEstado(req, res) {
        try {
            const order = req.params.idOrd;
            let status = "";
            let parametros = {
                $set: {
                    status: status
                }
            }

            switch (req.body.status) {
                case 1:
                    parametros = {
                        $set: {
                            status: "En preparación",
                            fechaDeDespacho: "",
                            fechaDeEntregado: "",
                        }
                    };
                    break;
                case 2:
                    parametros = {
                        $set: {
                            status: "Despachado",
                            fechaDeDespacho: Date.now(),
                            fechaDeEntregado: "",
                        }
                    };
                    break;
                case 3:
                    parametros = {
                        $set: {
                            status: "Entregado",
                            fechaDeEntregado: Date.now(),
                        }
                    };
                    break;
                default:
                    status = "En preparación"
            }
            const ordenActualizada = await fnOrdenes().actualizarInfoPrueba(order, parametros);
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
}



module.exports = {
    OrderController,
}