const express = require('express');
const router = express.Router();
const productos = require('../assets/productos');

router.get('/', (req, res) => {
    res.render('./layouts/main', {listaDeProductos: productos});
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