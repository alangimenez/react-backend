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
let chat = [];

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
app.set('view engine', 'handlebars')

// rutas y acciones (router )

app.use('/api/productos', rutas);
app.get('/', (req, res) => {
    res.render('./table', { listaDeProductos: productos });
})

// io.socket
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    cargarProductos(); //envia productos cuando alguien se conecta
    setTimeout(() => cargarMensajes(), 500);
    socket.on('productoNuevo', () => {
        cargarProductos();
    })
    socket.on('nuevoMensaje', (dato) => {
        const mensajeFormateado = `<strong style="color: blue">${dato.email}</strong><span style="color: brown">[${dato.tiempo}]</span> ==><em style="color: green">${dato.msg}</em> <br>`;
        chat.push(mensajeFormateado);
        cargarMensajes();
    })
})

function cargarProductos() {
    //sin el setTimeout no actualiza automaticamente (supongo que hay algo que debería ser diferente)
    setTimeout(() => {
        // esta parte del for fue a los fines de mostrar un listado de prod mas corto
        // y poder verificar con mas facilidad si se actualizaba automaticamente.
        // Si se quiere ver toda la lista (50 prod), editar listadoCorto por productos 
        // y comentar el array y el for
        const listadoCorto = [];
        for (i=productos.length-5; i<productos.length; i++) {
            listadoCorto.push(productos[i])
        }
        io.sockets.emit('productosActualizado', listadoCorto)
    }, 500)
}

function cargarMensajes () {
        io.sockets.emit('mensajeParaCliente', chat)
}