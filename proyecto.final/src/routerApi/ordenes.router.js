const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllerApi/controller.ordenes');
const order = new OrderController();
const { validarStatus } = require('../middlewares/ordenes.mid');
const { validarAdmin } = require('../middlewares/productos.mid');
const { validarSesion } = require('../middlewares/carrito.mid'); 

// crea una nueva orden
router.post("/", async (req, res) => await order.crearOrden(req, res))

// cambiar estado de las ordenes (entre "En progreso", "En camino", "Entregado")
router.post("/:idOrd/estado", 
[validarSesion, validarAdmin, validarStatus],
async (req, res) => order.cambiarEstado(req, res))

// obtener el listado de pedidos (el mismo endpoint es para admin/user)
router.get("/", async (req, res) => order.obtenerPedidos(req, res))

module.exports = router;