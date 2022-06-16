class Converter {
    constructor() { }

    // Convierte un carritoModel a un carritoDTO
    converterCarritoDTOresponse(listadoCarrito) {
        try {
            const carritoDTO = {
                id: listadoCarrito.id,
                user: listadoCarrito.user,
                productos: [],
                total: listadoCarrito.total
            }
            for (let i = 0; i < listadoCarrito.productos.length; i++) {
                const productoDTO = this.converterProductoParaTotal(listadoCarrito.productos[i]);
                carritoDTO.productos.push(productoDTO);
            }
            return carritoDTO;
        } catch (e) {
            throw new Error("Hubo un error en converterCarritoDTOresponse " + e.message);
        }
        
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

    // Convierte un productoModel a un producto para calcular total
    converterProductoParaTotal(producto) {
        try {
            const productoTotal = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock,
                codigo: producto.codigo,
                precio: producto.precio,
                cantidad: producto.cantidad
            }
            return productoTotal;
        } catch (e) {
            throw new Error("Hubo un error en converterProductoParaTotal");
        }
        
    }

    // Convierte un carritoDTO a un carritoModel
    converterCarritoDTOrequest(id, user) {
        const carritoDTO = {
            id: id,
            user: user,
            productos: [],
            fechaDeCreacion: Date.now(),
            total: 0
        }
        return carritoDTO
    }

    // Convierte varios productosModels a productosDTO
    converterVariosProductosDTO(listadoProductos) {
        const listadoProductosDTO = [];
        for (let i = 0; i < listadoProductos.length; i++) {
            listadoProductosDTO.push(this.converterProductoDTOresponse(listadoProductos[i]));
        }
        return listadoProductosDTO;
    }

    convertProductoDTOrequest(id, producto) {
        return {
            ...producto,
            id: id,
            timestamp: Date.now(),
            cantidad: 1
        }
    }
}


module.exports = {
    Converter
}