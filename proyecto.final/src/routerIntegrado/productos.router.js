const express = require('express');
const router = express.Router();
const { ProdMid } = require('../middlewares/productos.mid');
const prodMid = new ProdMid();
const { ProductController } = require('../controllerIntegrado/controller.productos');
const product = new ProductController();

// obtiene array de productos
router.get('/',
    product.obtenerProductos)

// obtiene un producto en especifico
router.get('/:idProd',
    prodMid.validarProducto,
    product.obtenerProductoPorId)

// elimina un producto
router.delete('/:idProd',
    [prodMid.validarAdmin, prodMid.validarProducto],
    product.eliminarProducto)

// sube un nuevo producto
router.post('/',
    [prodMid.validarAdmin, prodMid.validarAtributosProducto],
    product.subirProducto)

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd',
    [prodMid.validarAdmin, prodMid.validarProducto, prodMid.validarAtributosProducto],
    product.modificarProducto)

module.exports = router;