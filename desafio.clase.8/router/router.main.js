const express = require('express');
const router = express.Router();
const productos = require('../assets/productos');

router.get('/', (req, res) => {
    res.send(productos);
})

router.get('/:id', (req, res) => {
    const idPedido = req.params.id;
    if (idPedido > productos.length) return res.status(404).json('El producto pedido no existe');
    const productoPedido = productos.find(data => +data.id == +idPedido);
    res.json(productoPedido);
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
    res.json(productos)
})

// findIndex busca el lugar que tiene en el array, splice lo elimina
// si se usa directo splice, despues del primer uso, pierde funcionalidad
router.delete('/:id', (req, res) => {
    const idEliminar = req.params.id;
    const idBuscado = productos.findIndex(data => data.id == idEliminar);
    const nuevosProductos = productos.splice(idBuscado,1);
    res.json(productos);
})

router.put('/:id', (req,res) =>{
    const idBuscar = req.params.id;
    const { name, autor, categoria, precio, href } = req.body;
    const idModificar = productos.findIndex(data => data.id == idBuscar);
    if (name) productos[idModificar].name = name;
    if (autor) productos[idModificar].autor = autor;
    if (categoria) productos[idModificar].categoria = categoria;
    if (precio) productos[idModificar].precio = precio;
    if (href) productos[idModificar].href = href;
    res.json(productos);
})

module.exports = router;