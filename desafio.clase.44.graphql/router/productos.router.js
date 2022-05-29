const express = require('express');
const router = express.Router();
const { ProductoController } = require('../controller/controller.productos');
const producto = new ProductoController();
const { Middlewares } = require('../middlewares/middlewares');
const middleware = new Middlewares();

// obtiene array de productos
router.get('/', (req, res) => producto.obtenerProductos(req, res))

// obtiene un producto en especifico
router.get('/:idProd', middleware.validarProducto, (req, res) => producto.obtenerProductoPorId(req, res)) 

// elimina un producto
router.delete('/:idProd', [middleware.validarAdmin, middleware.validarProducto], (req, res) => producto.eliminarProducto(req, res))

// sube un nuevo producto
router.post('/', [middleware.validarAdmin, middleware.validarAtributosProducto], (req, res) => producto.subirProducto(req, res))

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd', [middleware.validarAdmin, middleware.validarProducto, middleware.validarAtributosProducto], (req, res) => producto.modificarProducto(req, res))

module.exports = router;