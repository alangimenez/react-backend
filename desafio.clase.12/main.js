const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productos = require('./assets/productos.js');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const rutas = require('./router/router.main');
const { engine } = require('express-handlebars');
const fs = require('fs');
let chat = [];
const listadoCorto = [];

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

// rutas y acciones (router )

//app.use('/api/productos', rutas);
app.get('/', (req, res) => {
    res.render('../public/table',);
})

// io.socket
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    chat = JSON.parse(fs.readFileSync('./assets/mensajes.txt', 'utf-8'));
    cargarProductos(); //envia productos cuando alguien se conecta
    cargarMensajes(); //envia mensajes cuando alguien se conecta

    // el cliente envia un nuevo producto al servidor
    socket.on('productoNuevo', (nuevoProducto) => cargarProductos(nuevoProducto))

    // el cliente envia un nuevo mensaje al servidor
    socket.on('nuevoMensaje', (dato) => {
        chat.push(dato);
        fs.writeFileSync('./assets/mensajes.txt', JSON.stringify(chat), 'utf-8');
        cargarMensajes();
    })
})

// funcion para cada producto nuevo que se recibe
function cargarProductos(nuevoProducto) {
    if (nuevoProducto != undefined) listadoCorto.push(nuevoProducto)
    if (listadoCorto == "") {
        for (i = productos.length - 5; i < productos.length; i++) {
            listadoCorto.push(productos[i])
        }
    }
    io.sockets.emit('productosActualizado', listadoCorto)
}

//funcion para mostrar mensajes
function cargarMensajes() {
    io.sockets.emit('mensajeParaCliente', chat)
}