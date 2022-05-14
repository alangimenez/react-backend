const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const { errorProcess } = require('../../error/error.response');

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
    // constructor
    constructor(model) {
        this.model = model;
    }

    // metodos
    async leerInfo() {
        try {
            const informacion = await this.model.find({}, { __v: 0 });
            return informacion;
        } catch (e) {
            errorProcess(`leerInfo`, e.message);
            // errorLogger.error(`Ocurrio un error en leerinfo CRUD -> ` + e.message);
            // throw new Error(`Ocurrio un error en leerInfo CRUD -> ` + e.message)
        }
    }

    async leerInfoPorId(id) {
        try {
            return await this.model.find({ id: id }, { __v: 0 });
        } catch (e) {
            errorProcess(`leerInfoPorId`, e.message);
        }
    }

    async subirInfo(objeto) {
        try {
            let nuevoObjeto = await this.model.create(objeto);
            return nuevoObjeto
        } catch (e) {
            errorProcess(`subirInfo`, e.message);
        }
    }

    /* async subirInfoUser(objeto) {
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
    } */

    async eliminarInfo(id) {
        try {
            const result = await this.model.deleteOne({ id: id });
            return this.leerInfo();
        } catch (e) {
            errorProcess(`eliminarInfo`, e.message);
        }
    }

    // corregir, borra todos los carritos
    /* async vaciarCarrito() {
        const result = await this.model.deleteOne({});
        return this.leerInfo();
    } */

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
            errorProcess(`actualizarInfo`, e.message);
        }
    }
}

module.exports = { CrudMongo }