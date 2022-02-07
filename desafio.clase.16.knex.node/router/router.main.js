const express = require('express');
const router = express.Router();
const productos = require('../assets/productos');
const ContenedorProd = require('../controller/crudDBprod');

const knex = require('knex');
const options = require('../databases/config')
const knoxDB = new ContenedorProd(options, 'websocketchat', knex)

router.get('/', async (req, res) => {
    const datos = await knoxDB.readTable()
    console.log(datos);
    // res.render('./layouts/main', {listaDeProductos: datos});
})

router.post('/', (req, res) => {
    const { name, autor, categoria, precio, href } = req.body;
    const idNuevo = productos.length + 1;
    productos.push({
        id: idNuevo,
        name,
        autor, 
        categoria,
        precio,
        href,
    })
    res.redirect('/');
})

module.exports = router;