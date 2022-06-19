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
            // console.log(req.body);
            await repository.nuevoCarrito(req, req.body.username);
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

    // ver un carrito de un usuario en particular
    async verCarritoUsuario(req, res) {
        try {
            const carritoFiltrado = await fnCarritos().leerInfoPorId(req.session.user.cart);

            // response con JSON
            /*if (!carritoFiltrado) return res.status(404).json({ error: -12, message: `carrito no encontrado` })
            res.status(200).json(carritoFiltrado);*/

            // response con template
            if (req.user) {
                res.render('../views/carrito', { 
                    productosEnCarrito: carritoFiltrado[0].productos, 
                    user: req.session.user.id, 
                    isActive: req.session.user.id, 
                    boton: "Cerrar sesión",
                    total: carritoFiltrado[0].total });
            } else {
                // chequear esto, tecnicamente no deberia acceder al carrito si no esta logueado
                res.render('../views/loginError', { error: "Primero debe loguearse" });
            }

        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async confirmarCompra(req, res) {
        try {
            let carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            carrito = carrito[0];

            // await enviarMailPedido(req.user.nombre, req.user.id, productosConfirmados);
            await enviarMail(process.env.USER_NODEMAILER,
                `Nuevo pedido de ${req.session.user.nombre} - ${req.session.user.id}`,
                await this.listadoPedido(carrito.productos))

/*             await whatsapp(req.session.user.telefono,
                `Ha recibido un nuevo pedido de ${req.session.user.nombre} - ${req.session.user.id}`);
            await mensajeTexto(req.session.user.telefono,
                `Su pedido ha sido recibido, y se encuentra en proceso. Muchas gracias ${req.session.user.nombre}`);
 */            

            let resultado = await this.limpiarCarrito(req);
            // resultado = await calculoTotalCarrito(resultado);
            
            const orden = await orderController.crearOrden(req, carrito.productos, carrito.total);

            req.session.order = orden;
            /* const compra = {
                productos: productosConfirmados,
                total: carrito.total,
            }
            calculoTotalCarrito({ user: carrito.user }); */
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
            const parametros = {
                $set: {
                    productos: carritoSeleccionadoArray[0].productos
                }
            }
            let listadoActualizado = await fnCarritos().actualizarCantidadDeProductos(carritoSeleccionadoArray, parametros);
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
        const cambio = await fnCarritos().vaciarCarrito(req.session.user.cart);
        let carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
        let carritoVacio = {
            id: carrito[0].id,
            user: carrito[0].user,
            total: carrito[0].total,
            productos: carrito[0].productos
        }
        return carritoVacio
    }

    async calculoTotalCarrito(carrito) {
        let total = 0;
        // console.log(carrito);
        if (!carrito.productos) {
            total = 0;
        } else {
            for (let i = 0; i < carrito.productos.length; i++) {

                total = total + (carrito.productos[i].precio * carrito.productos[i].cantidad);
            }
        }
        // console.log(total);
        await fnCarritos().actualizarTotalCarrito(carrito.user, total);
        return total;
    }
}

module.exports = {
    CartController,
}