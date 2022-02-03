const express = require('express');
const router = express.Router();
const fs = require('fs');
let productos = [];
const { validarAdmin } = require('../middlewares/middlewares');
const { obtenerProductos, 
    obtenerProductoPorId, 
    eliminarProducto, 
    subirProducto, 
    modificarProducto } = require('../controller/controller.productos');
const { controlId } = require('../middlewares/productos.mid');

router.get('/', obtenerProductos ) //ok

// si el producto no existe, devuelve 404
router.get('/:id', controlId, obtenerProductoPorId ) //ok

// controla si el producto existe. Si existe, lo elimina. Si ya fue eliminado, devolvera 404.
// dependera del valor de admin si se puede acceder o no
router.delete('/:id', [validarAdmin, controlId], eliminarProducto) //ok

// sube nuevo producto y lo muestra. Dependera del valor de admin si se puede acceder o no.
router.post('/', validarAdmin, subirProducto) //ok, ver punto 1) en anotaciones en cuaderno

// esto modifica el valor de un producto dependiendo de lo que se haya modificado. 
// Dependera del valor de admin si se puede agregar o no.
router.put('/:id', [validarAdmin, controlId], modificarProducto) //ok, ver si filtro se agrega a class crud

module.exports = router;