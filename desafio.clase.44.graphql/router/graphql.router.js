const express = require('express');
const router = express.Router();

// graphql
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('../models/schemaGraphQL');
const { Graph } = require('../controller/controller.graphql')
const graph = new Graph();

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: {
        getProductos: graph.getProductos,
        getProducto: graph.getProducto,
        createProducto: graph.createProducto,
        deleteProducto: graph.deleteProducto,
        updateProducto: graph.updateProducto,
        getCarrito: graph.getCarrito,
        getProductoOfCarrito: graph.getProductoOfCarrito,
        createCarrito: graph.createCarrito,
        addProdToCarrito: graph.addProdToCarrito,
        deleteProdFromCarrito: graph.deleteProdFromCarrito,
    },
    graphiql: true,
}))

module.exports = router;