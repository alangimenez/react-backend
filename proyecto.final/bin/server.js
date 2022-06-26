require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { AppMidd } = require('../src/middlewares/app.mid');
const appMidd = new AppMidd();
const { engine } = require('express-handlebars');
const { logger, errorLogger } = require('../src/config/config.log4js');
const cluster = require('cluster');
const os = require('os');

// chat
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);
require('../src/utils/chat')(httpServer);

// SERVER CON CLUSTER Y FORK
if (process.env.START_MODE === "CLUSTER") {
    if (cluster.isMaster) {
        logger.info(`El proceso primario es ${process.pid}`);

        const workers = os.cpus().length;
        logger.info(`Numero de workers = ${workers}`);

        for (let i = 0; i < workers; i++) cluster.fork();

        cluster.on('exit', (worker) => {
            logger.info(`Worker ${worker.process.pid} se cerró`)
        })
    } else {
        const server = app.listen(PORT, () => {
            logger.info(`Servidor corriendo en ${PORT}`)
        })
    }
}
if (process.env.START_MODE === 'FORK') {
    const server = httpServer.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${PORT} en modo ${process.env.START_MODE} y funcionalidad "${process.env.MODE}"`);
    }).on('error', (error => {
        errorLogger.error(error);
    }));
}
if (process.env.START_MODE != 'CLUSTER' && process.env.START_MODE != 'FORK') {
    const server = httpServer.listen(PORT, () => {
        logger.info(`El servidor solo puede funcionar en modo 'CLUSTER' o 'FORK'. Por favor, cambie el modo de iniciar la aplicación.`);
    }).on('error', (error => {
        errorLogger.error(error);
    }));
}

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// session y passport
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('../src/middlewares/passport');
app.use(session({
    name: 'my-session',
    secret: 'gatos',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60,
    }),
    cookie: {
        maxAge: +process.env.MAX_AGE_SESSION * 60000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('src/public'));

// router
if (process.env.MODE === "api" && (process.env.START_MODE === 'CLUSTER' || process.env.START_MODE === 'FORK')) {
    const routerApiProductos = require('../src/routerApi/productos.router');
    const routerApiCarrito = require('../src/routerApi/carrito.router');
    const routerApiUsuario = require('../src/routerApi/usuario.router');
    const routerApiOrdenes = require('../src/routerApi/ordenes.router');
    app.use('/api/productos', routerApiProductos);
    app.use('/api/carrito', routerApiCarrito);
    app.use('/api/usuario', routerApiUsuario);
    app.use('/api/ordenes', routerApiOrdenes);
    app.get('/', (req, res) => { res.redirect('/api/productos') })
    app.use('*', appMidd.validarRuta);
}
if (process.env.MODE === "integrado" && (process.env.START_MODE === 'CLUSTER' || process.env.START_MODE === 'FORK')) {
    const routerIntegProductos = require('../src/routerIntegrado/productos.router');
    const routerIntegUsuario = require('../src/routerIntegrado/usuario.router');
    const routerIntegCarrito = require('../src/routerIntegrado/carrito.router');
    const routerIntegOrdenes = require('../src/routerIntegrado/ordenes.router');
    const routerIntegChat = require('../src/routerIntegrado/chat.router');
    app.use('/api/productos', routerIntegProductos);
    app.use('/api/carrito', routerIntegCarrito);
    app.use('/api/usuario', routerIntegUsuario);
    app.use('/api/ordenes', routerIntegOrdenes);
    app.use('/api/chat', routerIntegChat);
    app.get('/', (req, res) => { res.redirect('/api/productos') })
    app.use('*', appMidd.validarRuta);
}
if (process.env.MODE != "api" && process.env.MODE != "integrado" && (process.env.START_MODE === 'CLUSTER' || process.env.START_MODE === 'FORK')) {
    app.use('*', appMidd.errorModo);
}
if (process.env.START_MODE != 'CLUSTER' || process.env.START_MODE != 'FORK') {
    app.use('*', appMidd.errorStartModo);
}
