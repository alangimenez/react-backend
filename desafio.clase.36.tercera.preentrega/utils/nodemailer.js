const transporter = require('../config/config.nodemailer');

async function enviarMailPedido (nombre, email, lista) {
    try {
        let pedido = "";
        for (let i = 0; i < lista.length; i++) {
            pedido = pedido + `Productos ${i+1} es ${lista[i].nombre}. `
        }
        const mail = await transporter.sendMail({
            from: 'Node JS server',
            to: process.env.NODEMAILER,
            subject: `Nuevo pedido de ${nombre} - ${email}`,
            html: `Lista de productos solicitados: ${pedido}`
        });
        console.log(mail);
    } catch (error) {
        console.log(error)
    }
}

async function enviarMailRegistro (nombre, email, direccion, edad, telefono) {
    try {
        let datos = "";
        for (let i = 0; i < lista.length; i++) {
            pedido = pedido + `Productos ${i+1} es ${lista[i].nombre}. `
        }
        const mail = await transporter.sendMail({
            from: 'Node JS server',
            to: process.env.NODEMAILER,
            subject: `Nuevo registro`,
            html: `Se registro el usuario ${email}. Nombre: ${nombre}. Direccion: ${direccion}. Edad: ${edad}. 
            Telefono: ${telefono}`
        });
        console.log(mail);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    enviarMailPedido,
    enviarMailRegistro
}
    