const transporter = require('../config/config.nodemailer');
const { logger, errorLogger } = require('../config/config.log4js');

async function enviarMailPedido(nombre, email, lista) {
    try {
        let pedido = "";
        for (let i = 0; i < lista.length; i++) {
            pedido = pedido + `Productos ${i + 1} es ${lista[i].nombre}. \n `
        }
        const mail = await transporter.sendMail({
            from: 'Node JS server',
            to: process.env.USER_NODEMAILER,
            subject: `Nuevo pedido de ${nombre} - ${email}`,
            html: `Lista de productos solicitados: ${pedido}`
        });
        logger.info(mail);
    } catch (error) {
        errorLogger.error(error)
    }
}

async function enviarMailRegistro(nombre, email, direccion, edad, telefono) {
    try {
        const mail = await transporter.sendMail({
            from: 'Node JS server',
            to: process.env.NODEMAILER,
            subject: `Nuevo registro`,
            html: `Se registro el usuario ${email}. Nombre: ${nombre}. Direccion: ${direccion}. Edad: ${edad}. 
            Telefono: ${telefono}`
        });
        logger.info(mail);
    } catch (error) {
        errorLogger.error(error)
    }
}

module.exports = {
    enviarMailPedido,
    enviarMailRegistro
}
