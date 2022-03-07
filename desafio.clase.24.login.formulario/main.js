// server, websocket y handlebar
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const PORT = process.env.PORT || 8080;
const { engine } = require('express-handlebars');
require('./socket/socket')(httpServer);



// importar rutas
const { router: homePage } = require('./router/router.main');

// conexión server y error
httpServer.listen(PORT, (req, res) => {
  console.log(`Servidor funcionando en puerto ${PORT}`)
}).on('error', (error => {
  console.log(error.message);
}))

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

// middlewares


// rutas
app.use('/', homePage);
app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'));
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('my-session');
    res.sendFile(__dirname + '/public/logout.html')
  })
})