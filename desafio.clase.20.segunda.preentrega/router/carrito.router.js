const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito } = require('../controller/controller.carrito');
const { validarCarrito,
    productosEnCarrito,
    valProdDelCarrito } = require('../middlewares/carrito.mid')
const { controlProducto } = require('../middlewares/productos.mid')


// crear un carrito
router.post('/', validarArchivo, crearCarrito)

// elimina carrito
router.delete('/:idCarr', [validarArchivo, validarCarrito], eliminarCarrito)

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd', [validarArchivo, validarCarrito, controlProducto], prodAlCarrito)

// array de los productos de un carrito
router.get('/:idCarr/productos', [validarArchivo, validarCarrito, productosEnCarrito], prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd',
    [validarArchivo, validarCarrito, productosEnCarrito, valProdDelCarrito],
    elimProdDelCarrito)

module.exports = router;