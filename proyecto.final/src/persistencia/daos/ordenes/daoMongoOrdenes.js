const { CrudMongo } = require('../../contenedores/crudMongo');
const ordenesModel = require('../../../models/ordenMongo');

class DaoMongoOrdenes extends CrudMongo {
    constructor() {
        super(ordenesModel)
    }

    async leerInfoPorUser(user) {
        try {
            return await this.model.find({ user: user }, { __v: 0 });
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }

    async actualizarStatusPreparacionDespachado (idOrder, status, fechaDeDespacho, fechaDeEntregado) {
        try {
            await this.model.updateOne({id: idOrder}, {$set: {status: status, fechaDeDespacho: fechaDeDespacho, fechaDeEntregado: fechaDeEntregado}});
            return await this.leerInfoPorId(idOrder);
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }

    async actualizarStatusEntregado (idOrder, status, fechaDeEntregado) {
        try {
            await this.model.updateOne({id: idOrder}, {$set: {status: status, fechaDeEntregado: fechaDeEntregado}});
            return await this.leerInfoPorId(idOrder);
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }

    async traerOrdenesPorStatus (status) {
        try {
            return await this.model.find({ status: status }, { __v: 0 });
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }
}

module.exports = {
    DaoMongoOrdenes
}