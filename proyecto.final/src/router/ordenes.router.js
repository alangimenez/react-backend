const express = require('express');
const router = express.Router();
const { crearOrden } = require('../controller/controller.ordenes');

// crea una nueva orden
router.post("/", crearOrden)