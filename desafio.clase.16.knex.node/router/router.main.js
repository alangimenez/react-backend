// express y router
const express = require('express');
const router = express.Router();

// funcionamiento knex y config
const knex = require('knex');
const { Contenedor, nameTableSql } = require('../persistencia/crudDB');
const { optionsSql, optionsSqlite } = require('../databases/config');
const knexDBprod = new Contenedor(optionsSql, nameTableSql, knex)

router.get('/', async (req, res) => {
    try {
        const datos = await knexDBprod.readTable();
        res.render('../public/table', { listaDeProductos: datos });
    }
    catch (e) {
        console.log(e.message);
    }
})



module.exports = { router };