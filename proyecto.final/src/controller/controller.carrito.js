const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { enviarMailPedido } = require('../utils/nodemailer');
const { whatsapp, mensajeTexto } = require('../utils/twilio');
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();

class CartController {
    constructor() { }

    // retorna todos los carritos. Terminado el proyecto, ELIMINARLO porque no es parte de la consigna
    async obtenerTodosLosCarritos(req, res) {
        try {
            res.status(200).json(await fnCarritos().leerInfo());
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // crea carrito, muestra objeto
    async crearCarrito(req, res) {
        try {
            await res.status(201).json(await repository.nuevoCarrito(req.body.name));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina carrito, muestra array completo
    async eliminarCarrito(req, res) {
        try {
            const listadoActualizado = await fnCarritos().eliminarInfo(req.params.idCarr);
            res.status(201).json(listadoActualizado);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // inserta productos en carrito, muestra el carrito seleccionado completo
    async prodAlCarrito(req, res) {
        try {
            res.status(201).json(await repository.agregarProductosAlCarrito(req.params.idCarr, +req.params.idProd));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // lista todos los productos de un carrito
    async prodDelCarrito(req, res) {
        try {
            const carritoSeleccionado = await repository.obtenerProductosDelCarrito(req.params.idCarr);
            res.status(200).json(carritoSeleccionado.productos);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina productos del carrito, muestra listado de productos del carrito
    async elimProdDelCarrito(req, res) {
        try {
            res.status(201).json(await repository.eliminarProductosDelCarrito(req.params.idCarr, +req.params.idProd));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // ver un carrito de un usuario en particular
    async verCarritoUsuario(req, res) {
        try {
            const carritoFiltrado = await fnCarritos().leerInfoPorId(req.params.idCarr);

            // response con JSON
            if (!carritoFiltrado) return res.status(404).json({ error: -12, message: `carrito no encontrado` })
            res.status(200).json(carritoFiltrado);
    
            // response con template
            /* if (req.user) {
                res.render('../views/carrito', { productosEnCarrito: carritoFiltrado.productos, user: req.user.id, isActive: req.user.id, boton: "Cerrar sesión" });
            } else {
                // chequear esto, tecnicamente no deberia acceder al carrito si no esta logueado
                res.render('../views/loginError', { error: "Primero debe loguearse" });
            } */
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async confirmarCompra(req, res) {
        try {
            const carrito = await fnCarritos().leerInfoPorId(req.params.idCarr);
            const productosConfirmados = carrito.productos;
            await enviarMailPedido(req.user.nombre, req.user.id, productosConfirmados);
            await whatsapp(req.user.telefono, req.user.nombre, req.user.id);
            await mensajeTexto(req.user.telefono, req.user.nombre);
            let resultado = await fnCarritos().vaciarCarrito(req.params.idCarr);
            resultado = await calculoTotalCarrito(resultado);
            const compra = {
                productos: productosConfirmados,
                total: carrito.total,
            }
            calculoTotalCarrito({user: carrito.user});
            return compra;
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async vaciarCarrito(req, res) {
        try {
            const cambio = await fnCarritos().vaciarCarrito(req.body.id);
            if (cambio.matchedCount === 0) return res.status(404).json({error: -13, message: `usuario no encontrado`});
            let carrito = await fnCarritos().leerInfoPorId(req.body.id);
            carrito = await this.calculoTotalCarrito(carrito);
            res.json(carrito).status(201);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async modificarCantidadDeProdEnCarrito (req, res) {
        try {
            const { idCarr, idProd } = req.params;
            const { cantidad } = req.body;
            const listadoCarritos = await fnCarritos().leerInfo();
            const carritoSeleccionado = listadoCarritos.find(e => e.user === idCarr);
            const prodEnCarrito = carritoSeleccionado.productos.find(e => e.id === +idProd);
            prodEnCarrito.cantidad = cantidad;
            let listadoActualizado = await fnCarritos().actualizarCantidadDeProductos(idCarr, carritoSeleccionado, prodEnCarrito);
            listadoActualizado = await calculoTotalCarrito(listadoActualizado);
            res.status(201).json(listadoActualizado);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async calculoTotalCarrito(carrito) {
        let total = 0;
        if (!carrito.productos) {
            total = 0;
        } else {
            for (let i = 0; i < carrito.productos.length; i++) {
    
                total = total + (carrito.productos[i].precio * carrito.productos[i].cantidad);
            }
        }
        return await fnCarritos().actualizarTotalCarrito(carrito.user, total);
    }
}

module.exports = {
    CartController,
}