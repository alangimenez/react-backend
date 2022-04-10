const socket = io();

// recibe la info de la tabla, la vuelve a compilar y la inserta en HTML.
socket.on('productosActualizado', async (dato) => {
    let response;
    try {
        response = await fetch('http://localhost:8080/table.handlebars');
    } catch (e) {
        response = await fetch('https://coderhousedesafio34.herokuapp.com/table.handlebars');
    }
    let responseText = await response.text();
    let nuevoRender = Handlebars.compile(responseText);
    let html = nuevoRender({ listaDeProductos: dato });
    document.getElementById('destino').innerHTML = html;

    
    /* fetch('http://localhost:8080/table.handlebars')
        .then(data => data.text())
        .then(response => {
            let nuevoRender = Handlebars.compile(response);
            let html = nuevoRender({ listaDeProductos: dato });
            document.getElementById('destino').innerHTML = html;
        }) */
})

// toma el nuevo producto y lo envia al servidor
const cargaDato = () => {
    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value,
        stock: document.getElementById('stock').value,
        timestamp: new Date(),
    }
    socket.emit('productoNuevo', producto);
}

// recibe el chat del server y lo muestra
socket.on('mensajeParaCliente', (dato) => {
    const autorSchema = new normalizr.schema.Entity('autor');
    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
        author: autorSchema
    })
    const chatSchema = new normalizr.schema.Entity('chat', {
        chat: [mensajeSchema]
    })
    const datoDesnormalizado = normalizr.denormalize(dato.result, chatSchema, dato.entities);
    const historialMostrar = datoDesnormalizado.chat.reverse().map(e => {
        return `<strong style="color:blue">${e.author.id}</strong>
        <span style="color:brown">${e.id}</span> 
        <em style="color:green">${e.text}</em> <br>`
    }).join("")
    document.getElementById('chat').innerHTML = historialMostrar;

    const pesoNormalizado = JSON.stringify(dato).length;
    const pesoDesnormalizado = JSON.stringify(datoDesnormalizado).length;
    const compresion = parseInt(pesoNormalizado / pesoDesnormalizado * 100);
    document.getElementById('mensajeCompresion').innerHTML = "";
    document.getElementById('mensajeCompresion').innerHTML = `Porcentaje de compresión: ${compresion}%`
}
)

const enviarMensaje = () => {
    if (document.getElementById('email').value === "") {
        alert("Debe completar el campo Email")
        return
    }
    const mensaje = {
        author: {
            id: document.getElementById('email').value,
            nombre: "nombre del usuario",
            apellido: "apellido del usuario",
            edad: "edad del usuario",
            alias: 'alias del usuario',
            avatar: 'avatar del usuario'
        },
        text: document.getElementById('mensaje').value,
        id: new Date(),
    }
    socket.emit('nuevoMensaje', mensaje)
}

const generarDatosRandom = async () => {
    let response;
    try {
        response = await fetch('http://localhost:8080/api/productos-test');
    } catch (e) {
        response = await fetch('https://coderhousedesafio34.herokuapp.com/api/productos-test');
    }
    let datosRandom = await response.json();
    console.log(datosRandom);
    let datosRandomParaMostrar = datosRandom.map(e => {
        return `
        <tr>
        <td>${e.nombre}</td>
        <td>${e.descripcion}</td>
        <td>${e.stock}</td>
        <td>${e.precio}</td>
        <td><img src="${e.foto}"></td>
    </tr>`
    }).join("");
    document.getElementById('tableFaker').innerHTML = datosRandomParaMostrar;
}

const login = async () => {
    const datos = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dato: 'alan' })
    });
    const informacion = await datos.json();
    console.log(informacion);
}