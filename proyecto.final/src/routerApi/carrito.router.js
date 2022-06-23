const express = require('express');
const router = express.Router();
const { ProdMid } = require('../middlewares/productos.mid');
const prodMid = new ProdMid();
const { CartMid } = require('../middlewares/carrito.mid');
const cartMid = new CartMid();
const { OrderMid } = require('../middlewares/ordenes.mid');
const orderMid = new OrderMid();
const { CartController } = require('../controllerApi/controller.carrito');
const cart = new CartController();

// obtener datos del carrito de un usuario
router.get('/',
    cartMid.validarSesion,
    async (req, res) => cart.verCarritoUsuario(req, res))

// crear un carrito (en ningun caso se crea un carrito directamente, solo desde registrar un usuario)
// de todas maneras, se deja la lógica
/* router.post('/',
    cartMid.validarUser,
    cart.crearCarrito) */

// elimina carrito (en ningun caso se elimina un carrito, pero se deja la lógica)
/* router.delete('/:idCarr',
    cartMid.validarCarrito,
    cart.eliminarCarrito) */

// agrega productos al carrito de un usuario
router.post('/productos/:idProd',
    [cartMid.validarSesion, cartMid.validarCarrito, prodMid.validarProducto],
    cart.prodAlCarrito)

// listado de los productos en unc arrito
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

// confirma la compra
router.post('/confirmar',
    [cartMid.validarSesion, cartMid.validarCarritoConProductos, orderMid.validarStock],
    async (req, res) => {const compra = await cart.confirmarCompra(req, res)})

// vacia el carrito de un usuario
router.post('/vaciar',
    cartMid.validarSesion,
    async (req, res) => cart.vaciarCarrito(req, res))

module.exports = router;