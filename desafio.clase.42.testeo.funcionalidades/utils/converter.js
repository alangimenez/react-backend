class Converter {
    constructor() { }

    // Convierte un carritoModel a un carritoDTO
    converterCarritoDTOresponse(listadoCarrito) {
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
    converterProductoDTOresponse(producto) {
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
    converterCarritoDTOrequest(id, user) {
        const carritoDTO = {
            id: id,
            user: user,
            timestamp: Date.now(),
        }
        return carritoDTO
    }

    // Convierte varios productosModels a productosDTO
    converterVariosProductosDTO(listadoProductos) {
        const listadoProductosDTO = [];
        for (let i = 0; i < listadoProductos.length; i++) {
            listadoProductosDTO.push(converterProductoDTOresponse(listadoProductos[i]));
        }
        return listadoProductosDTO;
    }

    convertProductoDTOrequest(id, producto) {
        return {
            ...producto,
            id: id,
            timestamp: Date.now(),
        }
    }
}


module.exports = {
    Converter
}