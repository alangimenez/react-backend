const express = require('express');
const router = express.Router();
const { validarArchivo,
    validarUser,
    validarCarrito, 
    validarProducto,
    validarProductoEnCarrito} = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    obtenerTodosLosCarritos } = require('../controller/controller.carrito');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => obtenerTodosLosCarritos(req, res))

// crear un carrito
router.post('/', [validarUser], crearCarrito)

// elimina carrito
router.delete('/:idCarr', [validarCarrito], eliminarCarrito)

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd', [validarCarrito, validarProducto], prodAlCarrito)

// array de los productos de un carrito
router.get('/:idCarr/productos', [validarCarrito], prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd', [validarCarrito, validarProductoEnCarrito], elimProdDelCarrito)

module.exports = router;