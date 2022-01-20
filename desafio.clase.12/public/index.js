const socket = io();

socket.on('productosActualizado', (dato) => {
    fetch('http://localhost:8080/table.handlebars')
        .then(data => data.text())
        .then(response => {
            let nuevoRender = Handlebars.compile(response);
            let html = nuevoRender({ listaDeProductos: dato });
            document.getElementById('destino').innerHTML = html;
        })
})

const cargaDato = () => {
    socket.emit('productoNuevo')
}

const enviarMensaje = () => {
    if (document.getElementById('email').value === "") {
        alert("Debe completar el campo Email")
        return
    }
    const email = document.getElementById('email').value;
    let tiempo = new Date();
    const msg = document.getElementById('mensaje').value;
    socket.emit('nuevoMensaje', { email, tiempo, msg })
}

socket.on('mensajeParaCliente', (dato) => {
    //sin el setTimeout, cada vez que un usuario se conecta al chat desaparece el mismo
    //y hay que esperar a que alguien mande un mensaje para que vuelva a aparecer
    setTimeout(() => {console.log(dato);
    const textoMostrar = dato.join("");
    document.getElementById('chat').innerHTML = textoMostrar;}, 500)
})