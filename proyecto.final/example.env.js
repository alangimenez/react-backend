# especifica el modo de funcionamiento, puede ser 'development' o 'production'
NODE_ENV='production'

# especifica el puerto de funcionamiento
PORT='8080'

# especifica el modo de iniciar el servidor, puede ser 'FORK' o 'CLUSTER'
START_MODE = 'FORK'

# la persistencia puede ser solo en mongodb
PERSISTENCIA="mongodb"

# se coloca la ruta uri de mongodb
MONGODB_URI=`uri de mongo`

# sin setear esto a 0, no funciona el envio de mails con NodeMailer
NODE_TLS_REJECT_UNAUTHORIZED='0' 

# indica si twilio va a funcionar o no. Para que funcione, colocarlo en 'on'. Con cualquier otro valor, no funciona
TWILIO_TURN = 'off'

# datos para acceso a twilio
ACCOUNT_TWILIO='account de twilio'
TOKEN_TWILIO='token de twilio'

# datos para acceso nodemailer
USER_NODEMAILER='account de node mailer'
PASS_NODEMAILER='pass de node mailer'

# tiempo para expiración de sesion (en minutos y en string)
MAX_AGE_SESSION='10'

# modo de funcionamiento, puede ser 'api' o 'integrado'
MODE='integrado'