const config = require('./config/config.process.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerProcess = require('./router/process.router');
const routerGzip = require('./router/gzip.router');
const { validarRuta } = require('./middlewares/middlewares');
const { engine } = require('express-handlebars');

// logger
const { logger, consoleLogger, infoLogger, warningLogger, errorLogger } = require('./config/log4js');

// motor de plantillas
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());

const server = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en puerto ${config.PORT}`);
}).on('error', (error => {
    console.log(error);
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/', routerProcess);
app.use('/', routerGzip);
app.use('*', validarRuta);