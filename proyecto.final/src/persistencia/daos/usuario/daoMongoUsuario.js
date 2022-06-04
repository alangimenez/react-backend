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
}

module.exports = {
    DaoMongoUsuario
}