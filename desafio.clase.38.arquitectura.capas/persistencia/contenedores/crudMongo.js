const config = require('../../config/config.process.env');
const mongoose = require('mongoose');
const uri = config.MONGODB_URI;
const { controlProps } = require('../../middlewares/controlProps');
const { logger, errorLogger } = require('../../config/log4js');

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
        const informacion = await this.model.find({}, { __v: 0 });
        return informacion;
    }

    async leerInfoPorId(id) {
        let prodFiltrado = await this.model.find({id: id}, { __v: 0 });
        if (prodFiltrado.length === 0) prodFiltrado = "";
        return prodFiltrado[0];
    }

    async subirInfo(objeto) {
        let nuevoObjeto = await this.model.create(objeto);
        return nuevoObjeto
    }

    async eliminarInfo(id) {
        const result = await this.model.deleteOne({id: id});
        if (result.deletedCount === 0) return { error: -1, message: `producto no encontrado` }
        return this.leerInfo();
    }

    async actualizarInfo(objeto) {
        if (!objeto.nombre && !objeto.descripcion && !objeto.codigo && !objeto.foto && !objeto.precio && !objeto.stock) return (
            { error: -3, message: `Las caracteristicas que se intentan actualizar del producto no existen` }
        )
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