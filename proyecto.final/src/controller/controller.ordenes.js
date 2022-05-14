const { fnOrdenes } = require('../persistencia/index');
const { errorResponse } = require('../error/error.response');

function crearOrden (req, res) {
    try {
        const orden = {
            id: req.body.id,
            user: req.body.user,
            fechaDePedido: Date.now(),
            productos: req.body.productos,
            total: req.body.total,
            status: "En preparación",
            fechaDeEntregado: "",
            }
            const nuevaOrden = await fnOrdenes().subirInfo(orden);
            res.status(201).json(nuevaOrden);
    } catch (e) {
        errorResponse(500, "Ha ocurrido un error en el controller ", e.message, res);
    }
}

module.exports = {
    crearOrden
}