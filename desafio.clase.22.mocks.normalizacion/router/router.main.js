// express y router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { renderizarVista, productosRandom } = require('../controller/main.controller');

router.use(express.json());
router.use('/', express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => renderizarVista(req, res))

router.get('/api/productos-test', async (req, res) => productosRandom(req, res))

module.exports = { router };