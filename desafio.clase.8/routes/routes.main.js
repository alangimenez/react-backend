const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { obtenerProductos,
    obtenerProductoPorId,
    guardarProducto,
    modificarProducto,
    eliminarProducto } = require('../controller/controller.main')

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => obtenerProductos(req, res)) 

router.get('/:id', (req, res) => obtenerProductoPorId(req, res))

router.post('/', (req, res) => guardarProducto(req, res))

router.put('/:id', (req, res) => modificarProducto(req, res) )

router.delete('/:id', (req, res) => eliminarProducto(req, res))

module.exports = { router };