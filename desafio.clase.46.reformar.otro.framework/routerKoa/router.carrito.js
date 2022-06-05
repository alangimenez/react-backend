const Router = require('koa-router');
const { CarritoKoaController } = require('../controllerKoa/controller.carrito');
const carrito = new CarritoKoaController();

const router = new Router({
    prefix: '/api/carrito'
});

// traer todos los carritos (ELIMINAR PARA PROYECTO FINAL)
router.get('/', ctx => carrito.obtenerTodosLosCarritos(ctx))

// crear un carrito
router.post('/', ctx => carrito.crearCarrito(ctx))

// elimina carrito
router.delete('/:idCarr', ctx => carrito.eliminarCarrito(ctx))

// agrega productos al carrito
router.post('/:idCarr/productos/:idProd',  ctx => carrito.prodAlCarrito(ctx))

// array de los productos de un carrito
router.get('/:idCarr/productos',  ctx => carrito.prodDelCarrito(ctx))

// elimina productos de un carrito (los elimina de a uno, no todos juntos)
router.delete('/:idCarr/productos/:idProd', ctx => carrito.elimProdDelCarrito(ctx))

module.exports = router;
