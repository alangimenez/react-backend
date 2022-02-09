// server, websocket y handlebar
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;
const { engine } = require('express-handlebars');

// rutas y otras importaciones
const bodyParser = require('body-parser');
const { router: homePage } = require('./router/router.main');

// knex.js y clases (si cambiamos knexDBprod para que funciones con SQlite, tambien hay que cambiarlo
// en el router y en el script)
const knex = require('knex');
const { Contenedor, nameTableSql, nameTableSqlite } = require('./persistencia/crudDB');
const { optionsSql, optionsSqlite } = require('./databases/config')
const knexDBmsg = new Contenedor(optionsSqlite, nameTableSqlite, knex);
const knexDBprod = new Contenedor(optionsSql, nameTableSql, knex)
const { verifyTable } = require('./persistencia/scripts')

// conexión server y error
httpServer.listen(PORT, (req, res) => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
}).on('error', (error => {
    console.log(error.message);
}))

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static('public'));

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// rutas
app.use('/', homePage);

// funcionamiento io.socket
io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    await verifyTable(nameTableSql, nameTableSqlite);
    const chat = await knexDBmsg.readTable();
    io.sockets.emit('mensajeParaCliente', chat);

    // el cliente envia un nuevo producto al servidor
    socket.on('productoNuevo', async (nuevoProducto) => {
        if (nuevoProducto != undefined) {
            await knexDBprod.writeTable(nuevoProducto);
        }
        const nuevoListado = await knexDBprod.readTable();
        io.sockets.emit('productosActualizado', nuevoListado)
    })

    // el cliente envia un nuevo mensaje al servidor
    socket.on('nuevoMensaje', async (dato) => {
        await knexDBmsg.writeTable(dato);
        const chat = await knexDBmsg.readTable();
        io.sockets.emit('mensajeParaCliente', chat);
    })
})