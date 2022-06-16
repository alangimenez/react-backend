const { fnProductos, fnCarritos } = require('../persistencia/factory');
const { enviarMailPedido, enviarMail } = require('../utils/nodemailer');
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
            // console.log(req.body);
            await repository.nuevoCarrito(req.body.username);
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
            const carritoFiltrado = await fnCarritos().leerInfoPorId(req.session.user.cart);

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

            // await enviarMailPedido(req.user.nombre, req.user.id, productosConfirmados);
            await enviarMail(process.env.USER_NODEMAILER,
                `Nuevo pedido de ${req.user.nombre} - ${req.user.id}`,
                this.listadoPedido(carrito.productos))

            await whatsapp(req.user.telefono,
                `Ha recibido un nuevo pedido de ${req.user.nombre} - ${req.user.id}`);
            await mensajeTexto(req.user.telefono,
                `Su pedido ha sido recibido, y se encuentra en proceso. Muchas gracias ${req.user.nombre}`);
            let resultado = await fnCarritos().vaciarCarrito(req.params.idCarr);
            resultado = await calculoTotalCarrito(resultado);
            const compra = {
                productos: productosConfirmados,
                total: carrito.total,
            }
            calculoTotalCarrito({ user: carrito.user });
            return compra;
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async vaciarCarrito(req, res) {
        try {
            const cambio = await fnCarritos().vaciarCarrito(req.session.user.cart);
            let carrito = await fnCarritos().leerInfoPorId(req.session.user.cart);
            let carritoNuevo = {
                id: carrito[0].id,
                user: carrito[0].user,
                total: carrito[0].total,
                productos: carrito[0].productos
            }
            carritoNuevo.total = 0;
            carritoNuevo.productos = [];
            const parametros = {
                $set: {
                    total: carritoNuevo.total
                }
            }
            await fnCarritos().actualizarInfoPrueba(req.session.user.cart, parametros);
            res.json(carritoNuevo).status(201);
        } catch (e) {
            return error.errorResponse(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
        }
    }

    async modificarCantidadDeProdEnCarrito(req, res) {
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

    async listadoPedido(lista) {
        let pedido = "";
        for (let i = 0; i < lista.length; i++) {
            pedido = pedido + `Producto ${i + 1} es ${lista[i].nombre}. \n `
        }
        return pedido;
    }
}

module.exports = {
    CartController,
}