const { Repository } = require('../persistencia/repository/reporitoryMongo');
const repositorio = new Repository();

class Graph {
    constructor() {}

    getProductos() {
        const productos = repositorio.obtenerTodosLosProductos();
        return productos;
    }

    getProducto({id}) {
        const producto = repositorio.obtenerProductPorId(id);
        return producto;
    }
    
    createProducto({datos}) {
        const producto = repositorio.subirNuevoProducto(datos);
        return producto;
    }
    
    deleteProducto({id}) {
        const productos = repositorio.eliminarProductPorId(id);
        return productos;
    }
    
    updateProducto({id, datos}) {
        const producto = repositorio.actualizarProductoPorId(id, datos);
        return producto;
    }
    
    getCarrito ({id}) {
        const carritos = repositorio.obtenerProductosDelCarrito(id);
        return carritos;
    }
    
    async getProductoOfCarrito ({id}) {
        const carrito = await repositorio.obtenerProductosDelCarrito(id);
        return carrito.productos;
    }
    
    createCarrito ({datos}) {
        const carrito = repositorio.nuevoCarrito(datos.usuario);
        return carrito;
    }
    
    addProdToCarrito({idProd, idCarr}) {
        const productos = repositorio.agregarProductosAlCarrito(idCarr, idProd);
        return productos;
    }
    
    deleteProdFromCarrito({idProd, idCarr}) {
        const carrito = repositorio.eliminarProductosDelCarrito(idCarr, idProd);
        return carrito;
    }
}



module.exports = {
    Graph,
}