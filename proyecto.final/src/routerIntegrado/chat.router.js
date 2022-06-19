let chat = []

module.exports = function(server) {
    const io = require("socket.io")(server);
    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        io.sockets.emit('caracterRecibido', chat)

        socket.on('botones', (data) => {
            chat.push({
                socketId: socket.id,
                mensaje: data
            })
            io.sockets.emit('caracterRecibido', chat)
        })
    })
}