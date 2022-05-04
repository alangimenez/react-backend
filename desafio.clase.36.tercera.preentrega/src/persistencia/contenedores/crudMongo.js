const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const { controlProps } = require('../../middlewares/controlProps');

const { logger, errorLogger } = require('../../config/config.log4js');

(async () => {
    try {
        await mongoose.connect(uri);
        logger.info('database connected')
    } catch (e) {
        errorLogger.error(e.message);
    }
})();

class CrudMongo {
    constructor(model) {
        this.model = model;
    }

    async leerInfo() {
        const informacion = await this.model.find({}, { __v: 0 }).lean();
        return informacion;
    }

    async leerInfoPorId(id) {
        let prodFiltrado = await this.model.find({id: id}, { __v: 0 }).lean();
        if (prodFiltrado.length === 0) prodFiltrado = "";
        return prodFiltrado[0];
    }

    async subirInfo(objeto) {
        let nuevoObjeto = await this.model.create(objeto);

        /* let idNuevo, nuevoObjeto;
        const lista = await this.leerInfo();
        lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
        if (objeto.nombre) {
            const validacion = controlProps(objeto);
            if (validacion) return validacion;
            nuevoObjeto = await this.model.create({
                nombre: objeto.nombre,
                id: idNuevo,
                timestamp: Date.now(),
                descripcion: objeto.descripcion,
                codigo: objeto.codigo,
                foto: objeto.foto,
                precio: objeto.precio,
                stock: objeto.stock
            })
        } else {
            nuevoObjeto = await this.model.create({
                id: idNuevo,
                user: objeto,
                timestamp: Date.now(),
            })
        } */
        return nuevoObjeto
    }

    async subirInfoUser(objeto) {
        let nuevoObjeto = await this.model.create({
            id: objeto.id,
            password: objeto.password,
            nombre: objeto.nombre,
            direccion: objeto.direccion,
            edad: objeto.edad,
            telefono: objeto.telefono,
            foto: objeto.foto
        })
        return nuevoObjeto
    }

    async eliminarInfo(id) {
        const result = await this.model.deleteOne({user: id});
        if (result.deletedCount === 0) return { error: -1, message: `producto no encontrado` }
        return this.leerInfo();
    }

    // corregir, borra todos los carritos
    async vaciarCarrito() {
        const result = await this.model.deleteOne({});
        return this.leerInfo();
    }

    async actualizarInfo(objeto) {
        let resultado = ""; 
        if (objeto.nombre) resultado = await this.model.updateOne({id: objeto.id}, {$set: {nombre: objeto.nombre}});
        if (objeto.codigo) resultado = await this.model.updateOne({id: objeto.id}, {$set: {codigo: objeto.codigo}});
        if (objeto.descripcion) resultado = await this.model.updateOne({id: objeto.id}, {$set: {descripcion : objeto.descripcion}});
        if (objeto.stock) resultado = await this.model.updateOne({id: objeto.id}, {$set: {stock : objeto.stock}});
        if (objeto.foto) resultado = await this.model.updateOne({id: objeto.id}, {$set: {foto : objeto.foto}});
        if (objeto.precio) resultado = await this.model.updateOne({id: objeto.id}, {$set: {precio : objeto.precio}});
        if (objeto.timestamp) resultado = await this.model.updateOne({id: objeto.id}, {$set: {timestamp : Date.now()}});
        if (resultado.modifiedCount === 0) return { error: -1, message: `producto no encontrado` }
        return this.leerInfoPorId(objeto.id);
    }
}

module.exports = { CrudMongo }