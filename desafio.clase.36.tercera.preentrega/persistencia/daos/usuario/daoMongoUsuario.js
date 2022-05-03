const { CrudMongo } = require('../../contenedores/crudMongo');
const usuarioModel = require('../../../models/usuarioMongo');

class DaoMongoUsuario extends CrudMongo {
    constructor() {
        super(usuarioModel)
    }

    async actualizarAvatarUsuario(usuario) {
        const final = await this.model.updateOne({ id: usuario.id }, { $set: { foto: usuario.foto } });
    }
}

module.exports = {
    DaoMongoUsuario
}