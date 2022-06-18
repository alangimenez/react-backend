PORT=8080
# la persistencia solo puede ser en mongodb
PERSISTENCIA="mongodb"
# se coloca la ruta uri de mongodb
MONGODB_URI=`uri mongo`
# se coloca la ruta del archivo .json para acceder a firebase
FIREBASE_ROUTE='../../databases/backend-ecommerce-c1032-firebase-adminsdk-n0gj7-82ea707c9c.json'

# sin setear esto a 0, no funciona el envio de mails con NodeMailer
NODE_TLS_REJECT_UNAUTHORIZED='0' 

# datos para acceso a twilio
ACCOUNT_TWILIO='account twilio'
TOKEN_TWILIO='toker twilio'
NUMBER_SMS_TWILIO='numero twilio'

# datos para acceso nodemailer
USER_NODEMAILER='mail nodemailer'
PASS_NODEMAILER='password nodemailer'