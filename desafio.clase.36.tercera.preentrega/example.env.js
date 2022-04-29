PORT=8080
# la persistencia solo puede ser en mongodb
PERSISTENCIA="mongodb"
# se coloca la ruta uri de mongodb
MONGODB_URI=`mongodb+srv://leonel654321:C0mput4d0r4s.@coderhouse.7epn5.mongodb.net/mySecondDatabase?retryWrites=true&w=majority`
# se coloca la ruta del archivo .json para acceder a firebase
FIREBASE_ROUTE='../../databases/backend-ecommerce-c1032-firebase-adminsdk-n0gj7-82ea707c9c.json'

# sin setear esto a 0, no funciona el envio de mails con NodeMailer
NODE_TLS_REJECT_UNAUTHORIZED='0' 

# datos para acceso a twilio
ACCOUNT_TWILIO='AC125d0467ea87fc4ce2d76c7c5052050a'
TOKEN_TWILIO='e77390bc41128418ad36959a4c9b2a51'
NUMBER_SMS_TWILIO='+18597150942'

# datos para acceso nodemailer
USER_NODEMAILER='larry.heaney3@ethereal.email'
PASS_NODEMAILER='jSa9ugqdTtJAa6PUvr'