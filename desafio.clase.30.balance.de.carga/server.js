const config = require('./config/config.process.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerProcess = require('./router/process.router');
const { validarRuta } = require('./middlewares/middlewares');
const { engine } = require('express-handlebars');
const cluster = require('cluster');
const os = require('os');

if (config.MODE === "CLUSTER") {
    if (cluster.isMaster) {
        console.log(`El proceso primario es ${process.pid}`);

        const workers = os.cpus().length;
        console.log(`Numero de workers = ${workers}`);

        for (let i = 0; i < workers; i++) cluster.fork();

        cluster.on('exit', (worker, code) => {
            console.log(`Worker ${worker.process.pid} se cerró`)
        })
    } else {
        const server = app.listen(config.PORT, () => {
            console.log(`Servidor corriendo en ${config.PORT}`)
        })
    }
} else {
    const server = app.listen(config.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${config.PORT} en modo ${config.MODE}`);
    }).on('error', (error => {
        console.log(error);
    }));
}

// motor de plantillas
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/', routerProcess);
app.use('*', validarRuta);