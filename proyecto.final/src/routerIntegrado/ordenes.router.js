const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllerIntegrado/controller.ordenes');
const order = new OrderController();
const { OrderMid } = require('../middlewares/ordenes.mid'); // validar status
const orderMid = new OrderMid();
const { ProdMid } = require('../middlewares/productos.mid'); // validar admin
const prodMid = new ProdMid();
const { CartMid } = require('../middlewares/carrito.mid'); // validar sesion
const cartMid = new CartMid();

// crea una nueva orden
router.post("/",
    cartMid.validarSesion,
    async (req, res) => await order.crearOrden(req, res))

// cambiar estado de las ordenes (entre "En progreso", "En camino", "Entregado")
router.post("/:idOrd/estado",
    [cartMid.validarSesion, prodMid.validarAdmin, orderMid.validarStatus],
    async (req, res) => order.cambiarEstado(req, res))

// obtener el listado de pedidos (el mismo endpoint es para admin/user)
router.get("/",
    cartMid.validarSesion,
    async (req, res) => order.obtenerPedidos(req, res))

// obtener el listado de pedidos filtrado por status
router.get("/:status",
    [cartMid.validarSesion, prodMid.validarAdmin, orderMid.validarStatusEnParams],
    async (req, res) => order.obtenerPedidosFiltrados(req, res))

module.exports = router;