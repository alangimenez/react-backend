const express = require('express');
const router = express.Router();
const { validarAdmin } = require('../middlewares/middlewares');
const { obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto } = require('../controller/controller.productos');

// obtiene array de productos
router.get('/', obtenerProductos)

// obtiene un producto en especifico
router.get('/:idProd', obtenerProductoPorId) 

// elimina un producto
router.delete('/:idProd', [validarAdmin], eliminarProducto)

// sube un nuevo producto
router.post('/', [validarAdmin], subirProducto)

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd', [validarAdmin], modificarProducto)

module.exports = router;