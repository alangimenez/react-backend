const express = require('express');
const router = express.Router();
const { crearOrden } = require('../controller/controller.ordenes');

// crea una nueva orden
router.post("/", crearOrden)

// cambiar estado de las ordenes (entre "En progreso", "En camino", "Entregado")
router.post("/estado", cambiarEstado)

// obtener el listado de pedidos (el mismo endpoint es para admin/user)
router.get("/", obtenerPedidos)
