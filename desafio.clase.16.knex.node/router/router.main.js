// express y router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// funcionamiento knex y config
const { baseDeDatos } = require('../persistencia/index');
const { conexionProductos } = require('../persistencia/index')

router.use(express.json());
router.use('/', express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    try {
        const datos = await baseDeDatos(conexionProductos.type, conexionProductos.nameTable, conexionProductos.info).readTable();
        res.render('../public/table', { listaDeProductos: datos });
    }
    catch (e) {
        console.log(e.message);
    }
})



module.exports = { router };