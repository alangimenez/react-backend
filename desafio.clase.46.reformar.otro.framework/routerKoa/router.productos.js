const Router = require('koa-router');
const { ControllerKoaProduct } = require('../controllerKoa/controller.productos');
const product = new ControllerKoaProduct();

const router = new Router({
    prefix: '/api/productos'
});

router.get('/', ctx => product.obtenerProductos(ctx))

router.get('/:idProd', ctx => product.obtenerProductoPorId(ctx))

router.delete('/:idProd', ctx => product.eliminarProducto(ctx))

router.post('/', ctx => product.subirProducto(ctx))

router.put('/:idProd', ctx => product.modificarProducto(ctx))

module.exports = router;