const { fnMensaje } = require('../persistencia/factory');

module.exports = async function(server) {
    const io = require("socket.io")(server);

    let chat = [];
    chat = await fnMensaje().leerInfo();
    chat = lastMessages(chat);

    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        io.sockets.emit('caracterRecibido', chat)

        socket.on('botones', async (data) => {
            let id = 0;
            chat.length === 0 ? id = 1 : id = chat[chat.length -1].id
            const mensaje = {
                id: id,
                user: socket.id,
                mensaje: data,
                timestamp: Date.now(),
            }
            chat.push(mensaje);
            await fnMensaje().subirInfo(mensaje);
            lastMessages(chat);
            io.sockets.emit('caracterRecibido', chat)
        })
    })
}

function lastMessages(chat) {
    for (let i = 100 ; i < chat.length ; i++) {
        chat.shift();
    }
    return chat;
}