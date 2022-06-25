const socket = io();

socket.on('mensaje', (dato) => {
    socket.emit('recepcion', 'El mensaje fue recibido con éxito')
})

socket.on('mensajeTodos', (dato) => {
    console.log(dato)
})

socket.on('caracterRecibido', (data) => {
    let mensaje = "";
    if (data.length > 0) {
        data.map(e => {
            mensaje += `<strong>${e.user}</strong>: ${e.mensaje} <br>`
        });
    } else {
        console.log('algo');
    }
    document.getElementById('destinoTexto').innerHTML = mensaje;
})

function boton() {
    const textoIngresado = document.getElementById('textoInput').value;
    const usuarioLogueado = document.getElementById('user').innerHTML;
    const body = {
        mensaje: textoIngresado,
        usuario: usuarioLogueado
    }
    document.getElementById('textoInput').value = "";
    socket.emit('botones', body);
}