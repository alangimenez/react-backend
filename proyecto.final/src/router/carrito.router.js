const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { validarProducto } = require('../middlewares/productos.mid');
const { validarProductoEnCarrito,
    validarCarrito,
    validarUser,
    validarUnidadesProductos,
    validarSesion } = require('../middlewares/carrito.mid');
const { CartController } = require('../controller/controller.carrito');
const cart = new CartController();

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
// router.get('/', async (req, res) => cart.obtenerTodosLosCarritos(req, res))

// ver un carrito en particular de algun usuario
router.get('/',
    validarSesion,
    async (req, res) => cart.verCarritoUsuario(req, res))

// crear un carrito
router.post('/', validarUser, cart.crearCarrito)

// elimina carrito
router.delete('/:idCarr', validarCarrito, cart.eliminarCarrito)

// agrega productos al carrito
router.post('/productos/:idProd',
    [validarSesion, validarCarrito, validarProducto],
    cart.prodAlCarrito)

// array de los productos de un carrito
router.get('/:idCarr/productos',
    [validarSesion, validarCarrito],
    cart.prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd',
    [validarSesion, validarCarrito, validarProductoEnCarrito],
    cart.elimProdDelCarrito)

// modificar cantidad de unidades de un producto dentro del carrito
router.post('/:idCarr/modificar/:idProd',
    [validarSesion, validarUnidadesProductos, validarCarrito, validarProductoEnCarrito],
    (req, res) => cart.modificarCantidadDeProdEnCarrito(req, res))

/////////////////////////////////////////////
/////////////////////////////////////////////

// endpoint para confirmar compra
router.post('/:idCarr/confirmar',
    validarSesion,
    async (req, res) => {
        const compra = await cart.confirmarCompra(req, res);
        res.status(201).json(compra);
    })

// endpoint post finalizada la compra
router.get('/compra/realizada/muchas/gracias', (req, res) => res.render('../views/resultado'))

// endpoint para vaciar el carrito
router.post('/vaciar',
    validarSesion,
    async (req, res) => cart.vaciarCarrito(req, res))

module.exports = router;