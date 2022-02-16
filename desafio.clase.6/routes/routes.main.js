const express = require('express');
const router = express.Router();
const { obtenerProductos,
    obtenerProductosRandom,
    guardarProducto,
    eliminarProducto } = require('../controller/controller.main')

router.use(express.json());

router.get('/productos', (req, res) => obtenerProductos(req, res))

router.get(`/productoRandom`, (req, res) => obtenerProductosRandom(req, res))

router.post('/productos', (req, res) => guardarProducto(req, res))

router.delete('/productos/:id', (req, res) => eliminarProducto(req, res))

module.exports = { router };