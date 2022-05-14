const express = require('express');
const router = express.Router();
const { validarAtributosProducto,
    validarProducto,
    validarAdmin } = require('../middlewares/productos.mid');
const { obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto } = require('../controller/controller.productos');

// obtiene array de productos
router.get('/', obtenerProductos)

// obtiene un producto en especifico
router.get('/:idProd', validarProducto, obtenerProductoPorId)

// elimina un producto
router.delete('/:idProd', [validarAdmin, validarProducto], eliminarProducto)

// sube un nuevo producto
router.post('/', [validarAdmin, validarAtributosProducto], subirProducto)

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd', [validarAdmin, validarProducto, validarAtributosProducto], modificarProducto)

module.exports = router;