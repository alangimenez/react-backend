const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { logger, errorLogger } = require('../config/config.log4js');

const { fnUsuarios } = require('../persistencia/factory');
// const UsuarioMongo = new fnUsuarios();

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
            telefono: req.body.telephone,
            foto: "",
            rol: "buyer",
            cart: 0 // provisorio, el correcto se asigna con la creación del cart
        };
        const usuarioLogueado = await fnUsuarios().leerInfoPorId(username);
        if (usuarioLogueado.length > 0) {
            req.session.error = "El email ya se encuentra registrado";
            errorLogger.error(req.session.error);
            return done(null, false)
        }
        const usuarioRegistrado = await fnUsuarios().subirInfo(newUser);
        req.session.user = newUser;
        logger.info('El usuario fue registrado con éxito');
        // console.log('El usuario fue registrado con éxito');
        return done(null, usuarioRegistrado);
    }
));

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
},
    async (req, username, password, done) => {
        /* const usuarioLogueado = Usuario.getByEmail(username) */ // con FileSystem
        const usuarioLogueado = await fnUsuarios().leerInfoPorId(username);
        if (!usuarioLogueado) {
            req.session.error = "El usuario no existe";
            errorLogger.error(req.session.error);
            return done(null, false);
        }
        if (!isValidPassword(usuarioLogueado, password)) {
            req.session.error = "La contraseña ingresada es invalida"
            errorLogger.error('Invalid password');
            // console.log('Invalid password');
            return done(null, false);
        }
        req.session.user = usuarioLogueado[0];
        return done(null, usuarioLogueado[0]);
    }));

const salt = () => bcrypt.genSaltSync(10);
const encrypt = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user[0].password);


passport.serializeUser((user, done) => {
    logger.info('Inside serializer');
    // console.log('Inside serializer');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    logger.info('Inside deserializer');
    // console.log('Inside deserializer');
    const user = await fnUsuarios().leerInfoPorId(id);
    done(null, user[0]);
});

module.exports = passport;