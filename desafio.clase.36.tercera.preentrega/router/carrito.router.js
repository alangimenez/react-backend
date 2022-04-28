const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    confirmarCompra,
    verCarritos,
    verCarritoUsuario,
    vaciarCarrito } = require('../controller/controller.carrito');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => verCarritos(req, res))

// ver un carrito en particular de algun usuario
router.get('/:idCarr', async (req, res) => verCarritoUsuario(req, res))

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

// endpoint para confirmar compra
router.post('/:idCarr/confirmar', async (req, res) => {
    await confirmarCompra(req, res);
    res.json({ resultado: "todo salio ok" });
})

// endpoint post finalizada la compra
router.get('/compra/realizada/muchas/gracias', (req, res) => res.render('../views/resultado'))

// endpoint para vaciar el carrito
router.post('/vaciar', async (req, res) => vaciarCarrito(req, res))

module.exports = router;