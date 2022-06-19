const express = require('express');
const router = express.Router();
const { ProdMid } = require('../middlewares/productos.mid'); // validar producto
const prodMid = new ProdMid();
const { CartMid } = require('../middlewares/carrito.mid');
const cartMid = new CartMid();
const { OrderMid } = require('../middlewares/ordenes.mid'); // validar stock
const orderMid = new OrderMid();
const { CartController } = require('../controllerIntegrado/controller.carrito');
const cart = new CartController();

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
// router.get('/', async (req, res) => cart.obtenerTodosLosCarritos(req, res))

// ver un carrito en particular de algun usuario
router.get('/',
    cartMid.validarSesion,
    async (req, res) => cart.verCarritoUsuario(req, res))

// crear un carrito
router.post('/',
    cartMid.validarUser,
    cart.crearCarrito)

// elimina carrito
router.delete('/:idCarr',
    cartMid.validarCarrito,
    cart.eliminarCarrito)

// agrega productos al carrito
router.post('/productos/:idProd',
    [cartMid.validarSesion, cartMid.validarCarrito, prodMid.validarProducto],
    cart.prodAlCarrito)

// array de los productos de un carrito
router.get('/productos',
    [cartMid.validarSesion, cartMid.validarCarrito],
    cart.prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/productos/:idProd',
    [cartMid.validarSesion, cartMid.validarCarrito, cartMid.validarProductoEnCarrito],
    cart.elimProdDelCarrito)

// modificar cantidad de unidades de un producto dentro del carrito
router.post('/modificar/:idProd',
    [cartMid.validarSesion, cartMid.validarUnidadesProductos, cartMid.validarCarrito, cartMid.validarProductoEnCarrito, cartMid.validarStockActual],
    (req, res) => cart.modificarCantidadDeProdEnCarrito(req, res))

// endpoint para confirmar compra
router.post('/confirmar',
    [cartMid.validarSesion, cartMid.validarCarritoConProductos, orderMid.validarStock],
    async (req, res) => { const compra = await cart.confirmarCompra(req, res); })

// endpoint post finalizada la compra
router.get('/comprafinalizada',
    cartMid.validarSesion,
    (req, res) => res.render('../views/resultado', {
        total: req.session.order.total,
        orden: req.session.order.id,
        direccion: req.session.order.direccion,
        productos: req.session.order.productos
    }))

// endpoint para vaciar el carrito
router.post('/vaciar',
    cartMid.validarSesion,
    async (req, res) => cart.vaciarCarrito(req, res))

module.exports = router;