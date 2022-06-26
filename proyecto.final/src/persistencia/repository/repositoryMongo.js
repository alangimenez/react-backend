const { fnProductos, fnCarritos, fnUsuarios, fnOrdenes } = require('../factory');
const { errorLogger } = require('../../config/config.log4js');
const { Converter } = require('../../utils/converter');
const converter = new Converter();
const bcrypt = require('bcrypt');

class Repository {
    constructor() { }

    // Obtiene los datos del carrito de un usuario en formato Model y se devuelve en formato DTO
    obtenerCarrito = async (user) => {
        try {
            const carrito = await fnCarritos().leerInfoPorId(user);
            return converter.converterCarritoDTOresponse(carrito[0]);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerCarrito Repository -> ` + e.message)
        }
    }

    // Arma un nuevo Carrito y lo envia al DAO. Al recibirlo, lo convierte a DTO para enviarlo al cliente.
    // Adicionalmente carga el numero de carrito al perfil de usuario y lo actualiza en la sesión
    nuevoCarrito = async (req, user) => {
        try {
            const lista = await fnCarritos().leerInfo();
            let idNuevo = 0;
            lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
            const nuevoCarritoDTOrequest = converter.converterCarritoDTOrequest(idNuevo, user);
            const nuevoCarritoDTOresponse = await fnCarritos().subirInfo(nuevoCarritoDTOrequest);
            await fnUsuarios().actualizarCarritoDeUsuario(user, idNuevo);
            req.session.user.cart = idNuevo;
            req.session.save(err => errorLogger.error(`Hubo un error al actualizar datos de la sesión => ${err}`));
            return converter.converterCarritoDTOresponse(nuevoCarritoDTOresponse);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message)
        }
    }

    // Recolecta los datos necesarios para pedir al DAO eliminar el producto
    // Al recibir la respuesta, lo convierte a DTO para el cliente, previo calculo del nuevo total
    eliminarProductosDelCarrito = async (idCarrito, idProducto) => {
        try {
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
            const indexProdEnCarrito = carritoSeleccionado[0].productos.findIndex(e => e.id === idProducto);
            carritoSeleccionado[0].productos.splice(indexProdEnCarrito, 1);
            const carritoActualizado = await fnCarritos().eliminarProdEnCarrito(idCarrito, carritoSeleccionado[0].productos);
            const carritoActualizadoDTOResponse = converter.converterCarritoDTOresponse(carritoActualizado);

            const nuevoTotal = await this.calculoTotalCarrito(carritoActualizadoDTOResponse);
            carritoActualizadoDTOResponse.total = nuevoTotal;

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
            let nuevoProducto = true;
            const productoSeleccionado = await fnProductos().leerInfoPorId(idProducto);
            const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);

            // existen 3 casos posibles al agregar un producto al carrito (estan en igual orden en listado y codigo):
            // 1) que el carrito no tenga productos
            // 2) que el carrito tenga productos y posea al que se desea agregar
            // 3) que el carrito tenga productos y no posea al que se desea agregar
            if (carritoSeleccionado[0].productos.length === 0) {
                carritoActualizado = await fnCarritos().actualizarProdEnCarrito(idCarrito, productoSeleccionado[0])
                nuevoProducto = false;
            } else {
                for (let i = 0; i < carritoSeleccionado[0].productos.length; i++) {
                    if (carritoSeleccionado[0].productos[i].id === idProducto) {
                        carritoSeleccionado[0].productos[i].cantidad++;
                        carritoActualizado = await fnCarritos().actualizarCantidadDeProductos(carritoSeleccionado, carritoSeleccionado[0].productos);
                        nuevoProducto = false;
                    }
                }
            }
            if (nuevoProducto === true) {
                carritoActualizado = await fnCarritos().actualizarProdEnCarrito(idCarrito, productoSeleccionado[0])
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
            const carritoActualizadoDTOResponse = converter.converterCarritoDTOresponse(carritoSeleccionado[0]);
            return carritoActualizadoDTOResponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message)
        }
    }

    // Obtiene todos los productos, y los convierte de Model a DTO
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

    // Obtiene un producto en particular, y lo convierte de Model a DTO para devolverlo
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

    // elimina un producto en particular, y devuelve el listado de productos en formato DTO
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

    async traerProductosPorCategoria(categoria) {
        try {
            const productos = await fnProductos().traerProductosPorCategoria(categoria);
            const productosDTOresponse = converter.converterVariosProductosDTO(productos);
            return productosDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en traerProductosPorCategoria Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en traerProductosPorCategoria Repository -> ` + e.message)
        }
    }

    // actualiza los datos de perfil en la base de datos, seteando los dos datos posibles a modificar (direccion y telefono) 
    // y devolviendo los datos del usuario actualizados en formato DTO.
    async actualizarDatosPerfil(req) {
        try {
            let datos = {
                direccion: req.session.user.direccion,
                telefono: req.session.user.telefono
            }
            if (req.body.direccion) {
                datos.direccion = req.body.direccion;
                req.session.user.direccion = req.body.direccion;
            }
            if (req.body.telefono) {
                datos.telefono = req.body.telefono;
                req.session.user.telefono = req.body.telefono
            }
            await fnUsuarios().actualizarPerfil(req.session.user.id, datos);
            req.session.save(err => errorLogger.error(`Hubo un error al actualizar datos de la sesión => ${err}`));
            const userActualizado = await fnUsuarios().leerInfoPorId(req.session.user.id);
            return converter.converterUsuarioDTOResponse(userActualizado[0]);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en actualizarDatosPerfil Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en actualizarDatosPerfil Repository -> ` + e.message)
        }
    }

    // obtiene un listado de las ordenes que se tengan en base de datos, filtrado por estado.
    async obtenerPedidosPorStatus(status) {
        try {
            let statusString = "";
            switch (status) {
                case 1:
                    statusString = "En preparación";
                    break;
                case 2:
                    statusString = "Despachado";
                    break;
                case 3:
                    statusString = "Entregado";
                    break;
                default:
                    break;
            }
            const ordenes = await fnOrdenes().traerOrdenesPorStatus(statusString);
            return ordenes;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerPedidosPorStatus Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerPedidosPorStatus Repository -> ` + e.message)
        }
    }

    // modifica la contraseña del usuario, guardandola en base de datos encriptada. Luego devuelve los datos del usuario en DTO.
    async cambiarContrasena(usuario, contrasena) {
        try {
            const salt = () => bcrypt.genSaltSync(10);
            const encrypt = (password) => bcrypt.hashSync(password, salt());
            const usuarioActualizado = await fnUsuarios().actualizarPassword(usuario, encrypt(contrasena));
            const usuarioDTOresponse = converter.converterUsuarioDTOResponse(usuarioActualizado[0]);
            return usuarioDTOresponse;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en cambiarContraseña Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en cambiarContraseña Repository -> ` + e.message);
        }
    }

    // modifica la cantidad de unidades de un producto en carrito. para ello busca al producto dentro del carrito, le setea la nueva
    // cantidad, y lo graba en la base de datos. Posteriormente, actualiza el total del carrito y devuelve el carrito en formato DTO
    async modifyCantProdEnCart(idProd, cantidad, idCart) {
        try {
            const listadoCarritos = await fnCarritos().leerInfo();
            const carritoSeleccionado = listadoCarritos.find(e => e.id === idCart);
            const carritoSeleccionadoArray = [carritoSeleccionado];
            for (let i = 0; i < carritoSeleccionadoArray[0].productos.length; i++) {
                if (carritoSeleccionadoArray[0].productos[i].id === +idProd) {
                    carritoSeleccionadoArray[0].productos[i].cantidad = cantidad;
                }
            }
            let listadoActualizado = await fnCarritos().actualizarCantidadDeProductos(carritoSeleccionadoArray, carritoSeleccionadoArray[0].productos);
            listadoActualizado.total = await this.calculoTotalCarrito(carritoSeleccionadoArray[0]);
            return converter.converterCarritoDTOresponse(listadoActualizado);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en modifyCantProdEnCart Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en modifyCantProdEnCart Repository -> ` + e.message);
        }
    }

    // sube una nueva foto de perfil para el usuario y devuelve solamente el usuario en cuestion con la ruta del archivo cargado
    async subirAvatarPerfil(file, user) {
        try {
            const usuario = {
                id: user,
                foto: path.join(`/${file.filename}`)
            }
            await fnUsuarios().actualizarAvatarUsuario(usuario);
            return usuario;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en subirAvatarPerfil Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en subirAvatarPerfil Repository -> ` + e.message);
        }
    }

    // proceso de crear una nueva orden, donde se arma el objeto orden, se sube a la base de datos, se modifica el stock, y se 
    // devuelve la misma orden al user.
    async crearNuevaOrden(user, productos, total, direccion) {
        try {
            const lista = await fnOrdenes().leerInfo();
            let idNuevo = 0;
            lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
            const orden = {
                id: idNuevo,
                user: user,
                productos: productos,
                total: total,
                status: "En preparación",
                fechaDePedido: Date.now(),
                fechaDeDespacho: "",
                fechaDeEntregado: "",
                direccion: direccion
            }
            await fnOrdenes().subirInfo(orden);
            this.modificarStock(orden);
            return orden;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en crearNuevaOrden Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en crearNuevaOrden Repository -> ` + e.message);
        }
    }

    // cambia el estado de las ordenes en la base de datos y luego retorna la misma orden ya actualizada
    async cambiarEstadoOrden (idOrder, status) {
        try {
            let ordenActualizada;
            switch (status) {
                case 1:
                    ordenActualizada = await fnOrdenes().actualizarStatusPreparacionDespachado(idOrder, "En preparación", "", "");
                    break;
                case 2:
                    ordenActualizada = await fnOrdenes().actualizarStatusPreparacionDespachado(idOrder, "Despachado", Date.now(), "");
                    break;
                case 3:
                    ordenActualizada = await fnOrdenes().actualizarStatusEntregado(idOrder, "Entregado", Date.now());
                    break;
                default:
                    break;
            }
            return ordenActualizada;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en cambiarEstadoOrden Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en cambiarEstadoOrden Repository -> ` + e.message);
        }
    }

    // obtiene los pedidos desde la base de datos, dependiendo del rol del usuario que las pide
    async obtenerPedidos (rol, user) {
        try {
            if (rol === "admin") {
                return await fnOrdenes().leerInfo();
            } else {
                return await fnOrdenes().leerInfoPorUser(user);
            }
        } catch (e) {
            errorLogger.error(`Ocurrio un error en obtenerPedidos Repository -> ` + e.message);
            throw new Error(`Ocurrio un error en obtenerPedidos Repository -> ` + e.message);
        }
    }
    
    // PRIVADO

    // auxiliar para modificar el stock de los productos al realizar la compra
    async modificarStock(orden) {
        const productos = await fnProductos().leerInfo();
        for (let i = 0; i < orden.productos.length; i++) {
            const stockProducto = productos.find(e => e.id === orden.productos[i].id)
            if (stockProducto) {
                const nuevoStock = stockProducto.stock - orden.productos[i].cantidad;
                await fnProductos().actualizarStockProducto(stockProducto.id, nuevoStock);
            }
        }
    }
}


module.exports = {
    Repository,
}