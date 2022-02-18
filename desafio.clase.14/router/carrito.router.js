const express = require('express');
const router = express.Router();
const fs = require('fs');
const { validarCarrito, validarDelete, validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito } = require('../controller/controller.carrito');
const { controlId, productosEnCarrito } = require('../middlewares/carrito.mid')

// crear un carrito
router.post('/', validarArchivo, crearCarrito) //ok

// lee el archivo de carrito, revisa si el carrito existe, y lo elimina.
router.delete('/:idCarr', [validarArchivo, controlId], eliminarCarrito) //ok

// se hacen validacion para saber si existe el carrito y el producto en middleware
// luego, una vez confirmados los datos, se implementa logica para agregar los productos
// en el carrito seleccionado, dependiendo si ya hay productos agregados o no
router.post('/:idCarr/productos/:idProd', [validarArchivo, validarCarrito], prodAlCarrito) //ok

// lista los productos de un carrito, y devolvera error si el carrito no existe.
router.get('/:idCarr/productos', [validarArchivo, controlId, productosEnCarrito], prodDelCarrito) //ok

// en middleware valida si existe el carrito y los productos a eliminar en el carrito,
// y una vez validado datos, logica para eliminar los productos del carrito
router.delete('/:idCarr/productos/:idProd', [validarArchivo, validarDelete], elimProdDelCarrito) //ok

module.exports = router;