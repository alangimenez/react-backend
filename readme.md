Desafio 20 (segunda preentrega)
Esta entrega para funcionar necesita de un archivo .env y de la clave privada de autenticación para firebase.
El modelo de archivo .env es el siguiente:

PORT=8080
# la persistencia puede ser firebase, mongodb, memoria o filesystem
PERSISTENCIA="firebase"
# se coloca la ruta uri de mongodb
MONGODB_URI=`ruta/de/mongodb/uri`
# se coloca la ruta del archivo .json para acceder a firebase
FIREBASE_ROUTE='ruta/del/archivo/.json/para/acceder/a/firebase'

No se implemento la funcionalidad en SQlite y MariaDB dado que era opcional, y preferi centrarme en hacer lo indispensable del desafio para poder avanzar con los últimos 2 desafios que me restan para estar al día. Me hice bastante lio con MongoDB pero creo que ha quedado bien. Todo el feedback es bienvenido, por lo que si algo no funciona correctamente, favor de avisarme!

Desafio 16 (chat con base de datos)
En este caso no me apegue del todo a tu feedback/ejemplo, porque me costo entenderlo y me costaba plasmarlo en código, y tampoco quería copiar tu código por copiarlo sin entederlo bien. Pero trate de tomar la idea que me tiraste y hacerlo con eso. Para eso cree una función que dependiendo de los parametros que le pasemos, va a persistir la información en base de datos, file system o en memoria. Cada uno de estos 3 tiene su propio contenedor para guardar y leer la información, y esto se configura desde el index.js en persistencia (deje un pequeño comentario con las opciones disponibles). Creo que quedo un poco mejor que antes, porque ahora sería mas facil por ejemplo agregar otra base de datos (ponele postgree), dado que solo pasamos la configuración al config.js, y luego agregamos un nuevo caso en los switch, e importando todo correctamente debería funcionar. Lo mismo si quisiera agregar para que persista en Firebase u otro lado (necesitaría un nuevo contenedor con sus propios metodos y la config para conectar, pero luego es agregarlo al switch y debería funcionar). La carpeta controller quedo vacia dado que no hay lógica para el endpoint! Todo funciona en base a sockets (lo cual separe en otro archivo), el cual para funcionar se va al index.js en persistencia y en base a eso sabe que hacer. Tampoco da error al pasarle un nuevo nombre de una tabla e iniciarlo (daba error porque tenia parte de lógica en el router, que se ejecutaba antes de verificar tablas, ahora todo pasa por sockets). Se que no es tal como me lo mandaste de ejemplo, pero creo que tampoco quedo taaaan mal y así al menos entiendo mejor lo que hice, y desde un solo lugar se puede pasar para configurarle la persistencia de información. Capaz todavia no este para entregar, pero avisame de ultima y trato de arreglar los errores que puedas ver!

Desafio 14 (primer preentrega) 
Se reentrega desafio, dado que la ultima vez habia 3 endpoints que no funcionaban correctamente. Hice algunos cambios de lógica para que no de los errores, ademas de implementar algunos controles vía middlewares por ciertos casos que no tenia contemplados a la hora de agregar y eliminar productos de un carrito. A su vez elimine algo de código que estaba duplicado. Todos los posibles errores que podrían surgir deberían estar cubiertos con un mensaje/objeto, que indica el código de error y el mensaje del mismo.