const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { enviarMailPedido, enviarMail } = require('../utils/nodemailer');
const { whatsapp, mensajeTexto } = require('../utils/twilio');
const { ErrorHandler } = require('../error/error');
const error = new ErrorHandler();
const { Repository } = require('../persistencia/repository/repositoryMongo');
const repository = new Repository();
const { OrderController } = require('./controller.ordenes');
const orderController = new OrderController();

class CartController {
    constructor() { }

    // obtener los datos del carrito de un usuario
    async verCarritoUsuario(req, res) {
        try {
            res.status(200).json(await repository.obtenerCarrito(req.session.user.cart));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // crea carrito, muestra objeto
    async crearCarrito(req, res) {
        try {
            await repository.nuevoCarrito(req, req.body.username);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina carrito, muestra array completo
    /* async eliminarCarrito(req, res) {
        try {
            const listadoActualizado = await fnCarritos().eliminarInfo(req.params.idCarr);
            res.status(201).json(listadoActualizado);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    } */

    // inserta productos en carrito, muestra el carrito seleccionado completo
    async prodAlCarrito(req, res) {
        try {
            res.status(201).json(await repository.agregarProductosAlCarrito(req.session.user.cart, +req.params.idProd));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // lista todos los productos de un carrito
    async prodDelCarrito(req, res) {
        try {
            const carritoSeleccionado = await repository.obtenerProductosDelCarrito(req.session.user.cart);
            res.status(200).json(carritoSeleccionado.productos);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    // elimina productos del carrito, muestra listado de productos del carrito
    async elimProdDelCarrito(req, res) {
        try {
            res.status(201).json(await repository.eliminarProductosDelCarrito(req.session.user.cart, +req.params.idProd));
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async confirmarCompra(req, res) {
        try {
            let carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            carrito = carrito[0];
            await enviarMail(process.env.USER_NODEMAILER,
                `Nuevo pedido de ${req.session.user.nombre} - ${req.session.user.id}`,
                await this.listadoPedido(carrito.productos))

            /*             await whatsapp(req.session.user.telefono,
                            `Ha recibido un nuevo pedido de ${req.session.user.nombre} - ${req.session.user.id}`);
                        await mensajeTexto(req.session.user.telefono,
                            `Su pedido ha sido recibido, y se encuentra en proceso. Muchas gracias ${req.session.user.nombre}`);
             */

            let resultado = await this.limpiarCarrito(req);
            const orden = await orderController.crearOrden(req, carrito.productos, carrito.total);
            res.status(201).json(orden);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async vaciarCarrito(req, res) {
        try {
            const carritoVacio = await this.limpiarCarrito(req);
            res.json(carritoVacio).status(201);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async modificarCantidadDeProdEnCarrito(req, res) {
        try {
            const { idProd } = req.params;
            const { cantidad } = req.body;
            const listadoCarritos = await fnCarritos().leerInfo();
            const carritoSeleccionado = listadoCarritos.find(e => e.id === req.session.user.cart);
            const carritoSeleccionadoArray = [carritoSeleccionado];
            for (let i = 0; i < carritoSeleccionadoArray[0].productos.length; i++) {
                if (carritoSeleccionadoArray[0].productos[i].id === +idProd) {
                    carritoSeleccionadoArray[0].productos[i].cantidad = cantidad;
                }
            }
            let listadoActualizado = await fnCarritos().actualizarCantidadDeProductos(carritoSeleccionadoArray, carritoSeleccionadoArray[0].productos);
            listadoActualizado.total = await this.calculoTotalCarrito(carritoSeleccionadoArray[0]);
            res.status(201).json(listadoActualizado);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async listadoPedido(lista) {
        let pedido = "";
        for (let i = 0; i < lista.length; i++) {
            pedido = pedido + `Producto ${i + 1} es ${lista[i].nombre}. \n `
        }
        return pedido;
    }

    async limpiarCarrito(req) {
        await fnCarritos().vaciarCarrito(req.session.user.cart);
        return await repository.obtenerCarrito(req.session.user.cart);
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
        await fnCarritos().actualizarTotalCarrito(carrito.user, total);
        return total;
    }
}

module.exports = {
    CartController,
}