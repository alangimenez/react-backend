const socket = io();

console.log("Hola alan")

socket.on('mensaje', (dato) => {
    console.log(dato);
    socket.emit('recepcion', 'El mensaje fue recibido con éxito')
})

socket.on('mensajeTodos', (dato) => {
    console.log(dato)
})

socket.on('caracterRecibido', (data) => {
    let mensaje = "";
    if (data.length > 0) {
        data.map(e => {
            mensaje += `${e.socketId}: ${e.mensaje} <br>`
        });
    } else {
        console.log('algo');
    }
    document.getElementById('destinoTexto').innerHTML = mensaje;
})

function boton() {
    const textoIngresado = document.getElementById('textoInput').value;
    console.log(textoIngresado);
    socket.emit('botones', textoIngresado)
}