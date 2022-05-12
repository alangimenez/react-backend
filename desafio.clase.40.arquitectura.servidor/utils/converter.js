// Convierte un carritoModel a un carritoDTO
function converterCarritoDTOresponse(listadoCarrito) {
    const carritoDTO = {
        id: listadoCarrito.id,
        user: listadoCarrito.user,
        productos: []
    }
    for (let i = 0; i < listadoCarrito.productos.length; i++) {
        const productoDTO = converterProducto(listadoCarrito.productos[i]);
        carritoDTO.productos.push(productoDTO);
    }
    return carritoDTO;
}

// Convierte un productoModel a un productoDTO
function converterProductoDTOresponse(producto) {
    const productoDTO = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        foto: producto.foto,
        precio: producto.precio,
        stock: producto.stock,
        codigo: producto.codigo
    }
    return productoDTO;
}

// Convierte un carritoDTO a un carritoModel
function converterCarritoDTOrequest(id, user) {
    const carritoDTO = {
        id: id,
        user: user,
        timestamp: Date.now(),
    }
    return carritoDTO
}

// Convierte varios productosModels a productosDTO
function converterVariosProductosDTO(listadoProductos) {
    const listadoProductosDTO = [];
    for (let i = 0; i < listadoProductos.length; i++) {
        listadoProductosDTO.push(converterProductoDTOresponse(listadoProductos[i]));
    }
    return listadoProductosDTO;
}

function convertProductoDTOrequest(id, producto) {
    return {
        ...producto,
        id: id,
        timestamp: Date.now(),
    }
}

module.exports = {
    converterCarritoDTOresponse,
    converterCarritoDTOrequest,
    converterVariosProductosDTO,
    converterProductoDTOresponse, 
    convertProductoDTOrequest
}