const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    obtenerTodosLosCarritos } = require('../controller/controller.carrito');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => obtenerTodosLosCarritos(req, res))

// crear un carrito
router.post('/', validarArchivo, crearCarrito)

// elimina carrito
router.delete('/:idCarr', [validarArchivo], eliminarCarrito)

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd', [validarArchivo], prodAlCarrito)

// array de los productos de un carrito
router.get('/:idCarr/productos', [validarArchivo], prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd', [validarArchivo], elimProdDelCarrito)

module.exports = router;