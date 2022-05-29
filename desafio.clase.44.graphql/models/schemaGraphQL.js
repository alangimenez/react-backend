const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Productos {
        id: Int,
        nombre: String,
        descripcion: String,
        codigo: Int,
        foto: String,
        precio: Int,
        stock: Int,
    }

    type Carrito {
        id: Int,
        user: String,
        productos: [Productos],
    }

    input InputProducto {
        nombre: String,
        descripcion: String,
        codigo: Int,
        foto: String,
        precio: Int,
        stock: Int,
    }
    
    input InputCarrito {
        usuario: String
    }

    type Query {
        getProductos(id: Int): [Productos],
        getProducto(id: Int): Productos,
        getCarrito(id: Int): Carrito,
        getProductoOfCarrito(id: Int): [Productos]
    }

    type Mutation {
        createProducto(datos: InputProducto): Productos,
        deleteProducto(id: Int): [Productos],
        updateProducto(id: Int, datos: InputProducto): Productos,
        createCarrito(datos: InputCarrito): Carrito,
        addProdToCarrito(idProd: Int, idCarr: Int): Carrito,
        deleteProdFromCarrito(idProd: Int, idCarr: Int): Carrito,
    }
`)

module.exports = {
    schema,
}