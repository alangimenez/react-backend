const config = require('../../config/config.process.env');
const mongoose = require('mongoose');
const uri = config.MONGODB_URI;
const { controlProps } = require('../../middlewares/controlProps');
const { logger, errorLogger } = require('../../config/log4js');
const { error } = require('../../error/error');

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
        try {
            const informacion = await this.model.find({}, { __v: 0 });
            return informacion;
        } catch (e) {
            errorLogger.error(`Ocurrio un error en leerinfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en leerInfo CRUD -> ` + e.message)
        }

    }

    async leerInfoPorId(id) {
        try {
            return await this.model.find({ id: id }, { __v: 0 });
        } catch (e) {
            errorLogger.error(`Ocurrio un error en leerinfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en leerInfo CRUD -> ` + e.message)
        }

        // if (prodFiltrado.length === 0) prodFiltrado = "";
        // return prodFiltrado[0];
    }

    async subirInfo(objeto) {
        try {
            let nuevoObjeto = await this.model.create(objeto);
            return nuevoObjeto
        } catch (e) {
            errorLogger.error(`Ocurrio un error en subirInfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en subirInfo CRUD -> ` + e.message)
        }

    }

    async eliminarInfo(id) {
        try {
            const result = await this.model.deleteOne({ id: id });
            return this.leerInfo();
        } catch (e) {
            errorLogger.error(`Ocurrio un error en eliminarInfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en eliminarInfo CRUD -> ` + e.message)
        }
    }

    async actualizarInfo(objeto) {
        try {
            let resultado = "";
            if (objeto.nombre) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { nombre: objeto.nombre } });
            if (objeto.codigo) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { codigo: objeto.codigo } });
            if (objeto.descripcion) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { descripcion: objeto.descripcion } });
            if (objeto.stock) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { stock: objeto.stock } });
            if (objeto.foto) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { foto: objeto.foto } });
            if (objeto.precio) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { precio: objeto.precio } });
            if (objeto.timestamp) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { timestamp: Date.now() } });
            return this.leerInfoPorId(objeto.id);
        } catch (e) {
            errorLogger.error(`Ocurrio un error en actualizarInfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en actualizarInfo CRUD -> ` + e.message)
        }

    }
}

module.exports = { CrudMongo }