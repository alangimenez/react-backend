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
const { CarritoController } = require('../controller/controller.carrito');
const carrito = new CarritoController();
const { Middlewares } = require('../middlewares/middlewares');
const middleware = new Middlewares();

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => carrito.obtenerTodosLosCarritos(req, res))

// crear un carrito
router.post('/', [middleware.validarUser], (req, res) => carrito.crearCarrito(req, res))

// elimina carrito
router.delete('/:idCarr', [middleware.validarCarrito], (req, res) => carrito.eliminarCarrito(req, res))

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd', [middleware.validarCarrito, middleware.validarProducto], (req, res) => carrito.prodAlCarrito(req, res))

// array de los productos de un carrito
router.get('/:idCarr/productos', [middleware.validarCarrito], (req, res) => carrito.prodDelCarrito(req, res))

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd', [middleware.validarCarrito, middleware.validarProductoEnCarrito], (req, res) => carrito.elimProdDelCarrito(req, res))

module.exports = router;