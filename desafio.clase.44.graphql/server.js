const config = require('./config/config.process.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerProcess = require('./router/process.router');
const routerGzip = require('./router/gzip.router');
const { engine } = require('express-handlebars');
const { logger, errorLogger } = require('./config/log4js');
const { Middlewares } = require('./middlewares/middlewares');
const middleware = new Middlewares();

// motor de plantillas
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());

// inicio servidor
const server = app.listen(config.PORT, () => {
    logger.info(`Servidor escuchando en puerto ${config.PORT}`);
}).on('error', (error => {
    errorLogger.error(error);
}));

// middlewares generales
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*")
    next();
  });

// rutas
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/', routerProcess);
app.use('/', routerGzip);
app.get('/', (req, res) => res.redirect('/info'));
// app.use('*', middleware.validarRuta);

// graphql
const { graphqlHTTP } = require('express-graphql');
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

const { Repository } = require('./persistencia/repository/reporitoryMongo');
const repositorio = new Repository();

function getProductos() {
    const productos = repositorio.obtenerTodosLosProductos();
    return productos;
}

function getProducto({id}) {
    const producto = repositorio.obtenerProductPorId(id);
    return producto;
}

function createProducto({datos}) {
    const producto = repositorio.subirNuevoProducto(datos);
    return producto;
}

function deleteProducto({id}) {
    const productos = repositorio.eliminarProductPorId(id);
    return productos;
}

function updateProducto({id, datos}) {
    const producto = repositorio.actualizarProductoPorId(id, datos);
    return producto;
}

function getCarrito ({id}) {
    const carritos = repositorio.obtenerProductosDelCarrito(id);
    return carritos;
}

function getProductoOfCarrito ({id}) {
    const carrito = repositorio.obtenerProductosDelCarrito(id);
    return carrito.productos;
}

function createCarrito ({datos}) {
    const carrito = repositorio.nuevoCarrito(datos.usuario);
    return carrito;
}

function addProdToCarrito({idProd, idCarr}) {
    const productos = repositorio.agregarProductosAlCarrito(idCarr, idProd);
    return productos;
}

function deleteProdFromCarrito({idProd, idCarr}) {
    const carrito = repositorio.eliminarProductosDelCarrito(idCarr, idProd);
    return carrito;
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        getProductos,
        getProducto,
        createProducto,
        deleteProducto,
        updateProducto,
        getCarrito, 
        getProductoOfCarrito,
        createCarrito,
        addProdToCarrito,
        deleteProdFromCarrito
    },
    graphiql: true,
}))