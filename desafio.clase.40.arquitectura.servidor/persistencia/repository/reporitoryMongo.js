const { fnProductos, fnCarritos } = require('../factory');
const { logger, errorLogger } = require('../../config/log4js');
const { converterCarritoDTOresponse,
    converterVariosProductosDTO,
    converterCarritoDTOrequest, 
    converterProductoDTOresponse, 
    convertProductoDTOrequest } = require('../../utils/converter');

// Arma un nuevo Carrito y lo envia al DAO. Al recibirlo, lo convierte a DTO para enviarlo al cliente
const nuevoCarrito = async (user) => {
    try {
        const lista = await fnCarritos().leerInfo();
        lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
        const nuevoCarritoDTOrequest = converterCarritoDTOrequest(idNuevo, user);
        const nuevoCarritoDTOresponse = await fnCarritos().subirInfo(nuevoCarritoDTOrequest);
        return converterCarritoDTOresponse(nuevoCarritoDTOresponse);
    } catch (e) {
        errorLogger.error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en nuevoCarrito Repository -> ` + e.message)
    }

}

// Recolecta los datos necesarios para pedir al DAO eliminar el producto
// Al recibir la respuesta, lo convierte a DTO para el cliente
const eliminarProductosDelCarrito = async (idCarrito, idProducto) => {
    try {
        const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
        const indexProdEnCarrito = carritoSeleccionado[0].productos.findIndex(e => e.id === idProducto);
        carritoSeleccionado[0].productos.splice(indexProdEnCarrito, 1);
        const carritoActualizado = await fnCarritos().eliminarProdEnCarrito(idCarrito, carritoSeleccionado[0].productos);
        const carritoActualizadoDTOResponse = converterCarritoDTOresponse(carritoActualizado);
        return carritoActualizadoDTOResponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en eliminarProductosDelCarrito Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en eliminarProductosDelCarrito Repository -> ` + e.message)
    }

}

// Hace el pedido al DAO de agregar el producto.
// Al recibir respuesta, la convierte a DTO para el cliente.
const agregarProductosAlCarrito = async (idCarrito, idProducto) => {
    try {
        const productoSeleccionado = await fnProductos().leerInfoPorId(idProducto);
        const carritoActualizado = await fnCarritos().actualizarProdEnCarrito(idCarrito, productoSeleccionado[0])
        const carritoActualizadoDTOResponse = converterCarritoDTOresponse(carritoActualizado);
        return carritoActualizadoDTOResponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message)
    }

}

// Hace el pedido al DAO para obtener los productos del carrito
// Al recibirlo, lo convierte a DTO para el cliente
const obtenerProductosDelCarrito = async (idCarrito) => {
    try {
        const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarrito);
        const carritoActualizadoDTOResponse = converterCarritoDTOresponse(carritoSeleccionado[0]);
        return carritoActualizadoDTOResponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en agregarProductosAlCarrito Repository -> ` + e.message)
    }
}

const obtenerTodosLosProductos = async () => {
    try {
        const listadoProductos = await fnProductos().leerInfo();
        const listadoProductosDTOresponse = converterVariosProductosDTO(listadoProductos);
        return listadoProductosDTOresponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en obtenerTodosLosProductos Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en obtenerTodosLosProductos Repository -> ` + e.message)
    }
}

const obtenerProductPorId = async (idProducto) => {
    try {
        const productoBuscado = await fnProductos().leerInfoPorId(idProducto);
        const productoDTOresponse = converterProductoDTOresponse(productoBuscado[0]);
        return productoDTOresponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message)
    }
}

const eliminarProductPorId = async (idProduct) => {
    try {
        const productosRecibidos = await fnProductos().eliminarInfo(idProduct);
        const listadoProductosDTOresponse = converterVariosProductosDTO(productosRecibidos);
        return listadoProductosDTOresponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message)
    }
}

const subirNuevoProducto = async (producto) => {
    try {
        const lista = await fnProductos().leerInfo();
        lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
        const productoDTOrequest = convertProductoDTOrequest(idNuevo, producto);
        const nuevoProducto = await fnProductos().subirInfo(productoDTOrequest);
        const productoDTOresponse = converterProductoDTOresponse(nuevoProducto);
        return productoDTOresponse;

    } catch (e) {
        errorLogger.error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en obtenerProductoPorId Repository -> ` + e.message)
    }
}

const actualizarProductoPorId = async (idProducto, producto) => {
    try {
        const productoDTOrequest = convertProductoDTOrequest(idProducto, producto);
        const productoActualizado = await fnProductos().actualizarInfo(productoDTOrequest);
        const productoDTOresponse = converterProductoDTOresponse(productoActualizado[0]);
        return productoDTOresponse;
    } catch (e) {
        errorLogger.error(`Ocurrio un error en actualizarProductoPorId Repository -> ` + e.message);
        throw new Error(`Ocurrio un error en actualizarProductoPorId Repository -> ` + e.message)
    }
}

module.exports = {
    nuevoCarrito,
    eliminarProductosDelCarrito,
    agregarProductosAlCarrito,
    obtenerProductosDelCarrito, 
    obtenerTodosLosProductos, 
    obtenerProductPorId, 
    eliminarProductPorId, 
    subirNuevoProducto, 
    actualizarProductoPorId
}