/* const express = require('express');
const router = express.Router();
const { validarAtributosProducto,
    validarProducto,
    validarAdmin } = require('../middlewares/productos.mid');
const { ProductController } = require('../controllerIntegrado/controller.productos');
const product = new ProductController();

// obtiene array de productos
router.get('/', product.obtenerProductos)

// obtiene un producto en especifico
router.get('/:idProd', validarProducto, product.obtenerProductoPorId)

// elimina un producto
router.delete('/:idProd', [validarAdmin, validarProducto], product.eliminarProducto)

// sube un nuevo producto
router.post('/', [validarAdmin, validarAtributosProducto], product.subirProducto)

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd', [validarAdmin, validarProducto, validarAtributosProducto], product.modificarProducto)

module.exports = router; */