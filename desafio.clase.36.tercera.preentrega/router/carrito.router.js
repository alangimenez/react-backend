const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    confirmarCompra } = require('../controller/controller.carrito');
const { fnCarritos } = require('../persistencia/index');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => {
    const listadoCarritos = await fnCarritos().leerInfo();
    res.json(listadoCarritos);
})

router.get('/:idCarr', async (req, res) => {
    const carritoFiltrado = await fnCarritos().leerInfoPorId(req.params.idCarr);
    if (req.user) {
        res.render('../views/carrito', {productosEnCarrito: carritoFiltrado.productos, user: req.user.id, isActive: req.user.id, boton: "Cerrar sesión"});
    } else {
        // chequear esto, tecnicamente no deberia acceder al carrito si no esta logueado
        res.render('../views/loginError', {error: "Primero debe loguearse"});
    }
})

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

router.post('/:idCarr/confirmar', async (req, res) => {
    await confirmarCompra(req, res);
    console.log({resultado: "todo salio ok"})
    res.json({resultado: "todo salio ok"}) ;
})

router.get('/compra/realizada/muchas/gracias', (req, res) => res.render('../views/resultado'))

router.post('/vaciar', async (req, res) => {
    await fnCarritos().vaciarCarrito(req.body.hola);
    res.json({mensaje: "hola"});
})

module.exports = router;