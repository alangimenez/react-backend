const express = require('express');
const router = express.Router();
const { infoComprimida, random } = require('../controller/controller.gzip');
const compression = require('compression');

router.use(compression());

router.get('/info-comprimida', (req, res) => infoComprimida(req, res))

router.get('/api/randoms', (req, res) => random (req, res))

module.exports = router;