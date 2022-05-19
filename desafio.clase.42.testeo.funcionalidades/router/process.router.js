const express = require('express');
const router = express.Router();
const { infoSistema } = require('../controller/controller.process');



router.get('/info', (req, res) => infoSistema(req, res));

// router.get('/api/randoms', (req, res) => random (req, res))

module.exports = router;