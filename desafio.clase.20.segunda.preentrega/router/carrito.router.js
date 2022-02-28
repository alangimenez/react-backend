const express = require('express');
const router = express.Router();
const { validarArchivo } = require('../middlewares/middlewares');
const { crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito } = require('../controller/controller.carrito');
const { validarCarrito,
    productosEnCarrito,
    valProdDelCarrito } = require('../middlewares/carrito.mid')
const { controlProducto } = require('../middlewares/productos.mid')
const { fnProductos, fnCarritos } = require('../persistencia/index');

// ver carritos (eliminar luego de controlado todo, porque la consigna no lo pide)
router.get('/', async (req, res) => {
    const listadoCarritos = await fnCarritos().leerInfo();
    res.json(listadoCarritos);
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

module.exports = router;