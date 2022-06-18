const { fnProductos, fnCarritos, fnUsuarios } = require('../factory');
const { errorLogger } = require('../../config/config.log4js');
const { Converter } = require('../../utils/converter');
const converter = new Converter();

class Repository {
    constructor() { }

    // Arma un nuevo Carrito y lo envia al DAO. Al recibirlo, lo convierte a DTO para enviarlo al cliente.
    // Adicionalmente carga el numero de carrito al perfil de usuario
    nuevoCarrito = async (req, user) => {
        try {
            const lista = await fnCarritos().leerInfo();
            let idNuevo = 0;
            lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
            const nuevoCarritoDTOrequest = converter.converterCarritoDTOrequest(idNuevo, user);
            const nuevoCarritoDTOresponse = await fnCarritos().subirInfo(nuevoCarritoDTOrequest);

            const parametros = {
                $set: {
                    cart: idNuevo
                }
            }
            await fnUsuarios().actualizarInfoPrueba(user, parametros);
            req.session.user.cart = idNuevo;
            req.session.save(err => errorLogger.error(`Hubo un error al actualizar datos de la sesión => ${err}`));

            return converter.converterCarritoDTOresponse(nuevoCarritoDTOresponse);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message)
        }

    }

    // Recolecta los datos necesarios para pedir al DAO eliminar el producto
    // Al recibir la respuesta, lo convierte a DTO para el cliente
    eliminarProductosDelCarrito = async (idCarrito, idProducto) => {
        try {
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
            const indexProdEnCarrito = carritoSeleccionado.productos.findIndex(e => e.id === idProducto);
            carritoSeleccionado.productos.splice(indexProdEnCarrito, 1);
            const carritoActualizado = await fnCarritos().eliminarProdEnCarrito(idCarrito, carritoSeleccionado.productos);
            const carritoActualizadoDTOResponse = converter.converterCarritoDTOresponse(carritoActualizado);
            return carritoActualizadoDTOResponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en eliminarProductosDelCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en eliminarProductosDelCarrito Repository -> ` + e.message)
        }

    }

    // Hace el pedido al DAO de agregar el producto.
    // Al recibir respuesta, la convierte a DTO para el cliente.
    agregarProductosAlCarrito = async (idCarrito, idProducto) => {
        try {
            let carritoActualizado;
            const productoSeleccionado = await fnProductos().leerInfoPorId(idProducto);
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
            if(carritoSeleccionado[0].productos.length === 0) {
                carritoActualizado = await fnCarritos().actualizarProdEnCarrito(idCarrito, productoSeleccionado[0])
            } else {
                for (let i = 0; i < carritoSeleccionado[0].productos.length; i++) {
                    if (carritoSeleccionado[0].productos[i].id === idProducto) {
                        carritoSeleccionado[0].productos[i].cantidad++;
                        // console.log(carritoSeleccionado[0].productos);
                        const parametros = {
                            $set: {
                                productos: carritoSeleccionado[0].productos
                            }
                        }
                        carritoActualizado = await fnCarritos().actualizarCantidadDeProductos(carritoSeleccionado, parametros);
                    }
                }
            }
            const carritoActualizadoDTOResponse = converter.converterCarritoDTOresponse(carritoActualizado);
            const nuevoTotal = await this.calculoTotalCarrito(carritoActualizadoDTOResponse);
            carritoActualizadoDTOResponse.total = nuevoTotal;

            return carritoActualizadoDTOResponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message)
        }

    }

    // Hace el pedido al DAO para obtener los productos del carrito
    // Al recibirlo, lo convierte a DTO para el cliente
    obtenerProductosDelCarrito = async (idCarrito) => {
        try {
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
            const carritoActualizadoDTOResponse = converter.converterCarritoDTOresponse(carritoSeleccionado);
            return carritoActualizadoDTOResponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message)
        }
    }

    obtenerTodosLosProductos = async () => {
        try {
            const listadoProductos = await fnProductos().leerInfo();
            const listadoProductosDTOresponse = converter.converterVariosProductosDTO(listadoProductos);
            return listadoProductosDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerTodosLosProductos Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerTodosLosProductos Repository -> ` + e.message)
        }
    }

    obtenerProductPorId = async (idProducto) => {
        try {
            const productoBuscado = await fnProductos().leerInfoPorId(idProducto);
            const productoDTOresponse = converter.converterProductoDTOresponse(productoBuscado[0]);
            return productoDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message)
        }
    }

    eliminarProductPorId = async (idProduct) => {
        try {
            const productosRecibidos = await fnProductos().eliminarInfo(idProduct);
            const listadoProductosDTOresponse = converter.converterVariosProductosDTO(productosRecibidos);
            return listadoProductosDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message)
        }
    }

    subirNuevoProducto = async (producto) => {
        try {
            let idNuevo = 0;
            const lista = await fnProductos().leerInfo();
            lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
            producto = {
                ...producto,
                foto: ""
            }
            const productoDTOrequest = converter.convertProductoDTOrequest(idNuevo, producto);
            const nuevoProducto = await fnProductos().subirInfo(productoDTOrequest);
            const productoDTOresponse = converter.converterProductoDTOresponse(nuevoProducto);
            return productoDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en subirNuevoProducto Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en subirNuevoProducto Repository -> ` + e.message)
        }
    }

    actualizarProductoPorId = async (idProducto, producto) => {
        try {
            const productoDTOrequest = converter.convertProductoDTOrequest(idProducto, producto);
            const productoActualizado = await fnProductos().actualizarInfo(productoDTOrequest);
            const productoDTOresponse = converter.converterProductoDTOresponse(productoActualizado[0]);
            return productoDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en actualizarProductoPorId Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en actualizarProductoPorId Repository -> ` + e.message)
        }
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
    Repository,
}