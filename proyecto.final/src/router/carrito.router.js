const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { validarProducto } = require('../middlewares/productos.mid');
const { validarProductoEnCarrito,
    validarCarrito,
    validarUser,
    validarUnidadesProductos } = require('../middlewares/carrito.mid');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    confirmarCompra,
    verCarritos,
    verCarritoUsuario,
    vaciarCarrito,
    modificarCantidadDeProdEnCarrito } = require('../controller/controller.carrito');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => verCarritos(req, res))

// ver un carrito en particular de algun usuario
router.get('/:idCarr', async (req, res) => verCarritoUsuario(req, res))

// crear un carrito
router.post('/', validarUser, crearCarrito)

// elimina carrito
router.delete('/:idCarr', validarCarrito, eliminarCarrito)

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd', [validarCarrito, validarProducto], prodAlCarrito)

// array de los productos de un carrito
router.get('/:idCarr/productos', validarCarrito, prodDelCarrito)

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd', [validarCarrito, validarProductoEnCarrito], elimProdDelCarrito)

// modificar cantidad de unidades de un producto dentro del carrito
router.post('/:idCarr/modificar/:idProd',
    [validarUnidadesProductos, validarCarrito, validarProductoEnCarrito],
    (req, res) => modificarCantidadDeProdEnCarrito(req, res))
    
/////////////////////////////////////////////
/////////////////////////////////////////////

// endpoint para confirmar compra
router.post('/:idCarr/confirmar', async (req, res) => {
    const compra = await confirmarCompra(req, res);
    res.status(201).json(compra);
})

// endpoint post finalizada la compra
router.get('/compra/realizada/muchas/gracias', (req, res) => res.render('../views/resultado'))

// endpoint para vaciar el carrito
router.post('/vaciar', async (req, res) => vaciarCarrito(req, res))

module.exports = router;