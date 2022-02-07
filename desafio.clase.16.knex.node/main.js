// server, websocket y handlebar
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;
const { engine } = require('express-handlebars');

// otras importaciones
const bodyParser = require('body-parser');

// knex.js y clases
const knex = require('knex');
const Contenedor = require('./controller/crudDB');
const {optionsSql, optionsSqlite} = require('./databases/config')
const knexDBmsg = new Contenedor(optionsSql, 'websocketchat', knex);
const knexDBprod = new Contenedor(optionsSql, 'websocketproductos', knex)
const verifyTable = require('./persistencia/verifyTable')

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

// ruta, SACARLO A ROUTER AL FINAL, DESPUES DE TENER SOLO UN CRUD
app.get('/', async (req, res) => {
    const datos = await knexDBprod.readTable();
    res.render('../public/table', {listaDeProductos: datos});
})

// funcionamiento io.socket
io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    await verifyTable('websocketproductos', 'websocketchat');
    const chat = await knexDBmsg.readTable();
    cargarMensajes(chat);

    // el cliente envia un nuevo producto al servidor
    socket.on('productoNuevo', (nuevoProducto) => cargarProductos(nuevoProducto))

    // el cliente envia un nuevo mensaje al servidor
    socket.on('nuevoMensaje', async (dato) => {
        await knexDBmsg.writeTable(dato);
        const chat = await knexDBmsg.readTable();
        cargarMensajes(chat);
    })
})

// funcion para cada producto nuevo que se recibe
async function cargarProductos(nuevoProducto) {
    if (nuevoProducto != undefined) {
        await knexDBprod.writeTable(nuevoProducto);
    }
    const nuevoListado = await knexDBprod.readTable();
    io.sockets.emit('productosActualizado', nuevoListado)
}

//funcion para mostrar mensajes
function cargarMensajes(chatCompleto) {
    io.sockets.emit('mensajeParaCliente', chatCompleto)
}