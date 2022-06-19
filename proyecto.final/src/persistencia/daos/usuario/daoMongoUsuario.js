const { CrudMongo } = require('../../contenedores/crudMongo');
const usuarioModel = require('../../../models/usuarioMongo');
const { ErrorHandler } = require('../../../error/error');
const error = new ErrorHandler();

class DaoMongoUsuario extends CrudMongo {
    constructor() {
        super(usuarioModel)
    }

    async actualizarAvatarUsuario(usuario) {
        try {
            const final = await this.model.updateOne({ id: usuario.id }, { $set: { foto: usuario.foto } });
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async actualizarCarritoDeUsuario (idUser, idCart ) {
        try {
            await this.model.updateOne({id: idUser}, {$set: {cart: idCart}});
            return await this.leerInfoPorId(idUser);
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }
}

module.exports = {
    DaoMongoUsuario
}