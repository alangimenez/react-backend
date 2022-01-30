const socket = io();

// recibe la info de la tabla, la vuelve a compilar y la inserta en HTML.
socket.on('productosActualizado', (dato) => {
    fetch('http://localhost:8080/table.handlebars')
        .then(data => data.text())
        .then(response => {
            let nuevoRender = Handlebars.compile(response);
            let html = nuevoRender({ listaDeProductos: dato });
            document.getElementById('destino').innerHTML = html;
        })
})

// toma el nuevo producto y lo envia al servidor
const cargaDato = () => {
    const producto = {
        name: document.getElementById('name').value,
        autor: document.getElementById('autor').value,
        categoria: document.getElementById('categoria').value,
        precio: document.getElementById('precio').value,
        href: document.getElementById('href').value,
    }
    socket.emit('productoNuevo', producto);
}

// recibe el chat del server y lo muestra
socket.on('mensajeParaCliente', (dato) => {
    const historialMostrar = dato.map(e => {
        return `<strong style="color:blue">${e.email}</strong>
        <span style="color:brown">${e.tiempo}</span> 
        <em style="color:green">${e.msg}</em> <br>`
    }).join("")
    document.getElementById('chat').innerHTML = historialMostrar;
}
)

const enviarMensaje = () => {
    if (document.getElementById('email').value === "") {
        alert("Debe completar el campo Email")
        return
    }
    const mensaje = {
        email: document.getElementById('email').value,
        tiempo: new Date(),
        msg: document.getElementById('mensaje').value
    }
    socket.emit('nuevoMensaje', mensaje)
}