const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { DaoMongoUsuario } = require('../persistencia/daos/usuario/daoMongoUsuario');
const UsuarioMongo = new DaoMongoUsuario();

passport.use('registro', new LocalStrategy({
    passReqToCallback: true,
},
    async (req, username, password, done) => {
        const newUser = {
            nombre: req.body.firstname,
            direccion: req.body.direction,
            id: username,
            password: encrypt(password),
            edad: req.body.age,
            telefono: req.body.telephone
        };
        const usuarioRegistrado = await UsuarioMongo.subirInfoUser(newUser);
        if (usuarioRegistrado.error) {
            req.session.error = "El email ya se encuentra registrado";
            return done(null, false)
        }
        console.log('El usuario fue registrado con éxito');
        return done(null, usuarioRegistrado);
    }
));

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
},
    async (req, username, password, done) => {
        /* const usuarioLogueado = Usuario.getByEmail(username) */ // con FileSystem
        const usuarioLogueado = await UsuarioMongo.leerInfoPorId(username);
        if (!usuarioLogueado) {
            req.session.error = "El usuario no existe";
            return done(null, false);
        }
        if (!isValidPassword(usuarioLogueado, password)) {
            req.session.error = "La contraseña ingresada es invalida"
            console.log('Invalid password');
            return done(null, false);
        }
        req.user = usuarioLogueado;
        return done(null, usuarioLogueado);
    }));

const salt = () => bcrypt.genSaltSync(10);
const encrypt = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.serializeUser((user, done) => {
    console.log('Inside serializer');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Inside deserializer');
    const user = await UsuarioMongo.leerInfoPorId(id);
    done(null, user);
});

module.exports = passport;