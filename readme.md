Desafio 40
Buenas tardes. Hago entrega del desafio 40.

En el mismo se trato de mejorar un poco la lógica de la aplicación, tratando de separar bien las responsabilidades de cada capa.

Lo que es la parte de aplicar DAOs ya estaba hecho (tener presente que solo funciona el DAOs de Mongo, el resto no esta probado y es probable que no funcione porque habia aplicado cambios anteriormente, y no adapte el resto de DAOs/CRUDs). 

Lo que es la parte del DTO/patron Repository, lo aplique en una capa intermedia entre el controller y el DAOs. Me costo un poco entender este punto, y como no lo habiamos visto en clases, lo aplique según lo que entendi, quedando la aplicación de la siguiente manera:

- Los routers se encargan de determinar los endpoints disponibles.
- Los controllers se encargan solamente de recibir las peticiones del router y enviar la información necesaria al repository, así como dar respuesta al cliente una vez obtenida la respuesta del repository.
- El repository (patron repository) tiene la responsabilidad de armar los DTO request/response, que sirven para enviar la información a los DAOs (en el caso de request) y al controller (en el caso de response). Es decir, esta capa se ocupa de requerir a todos los DAOs necesarios parar armar los DTOs correspondientes para persistir en la base de datos la información necesaria. A su vez, al recibir información de la base de datos, se encarga de armar un DTO para enviar al cliente, con la información que a este le concierne (por ejemplo, al usuario no le interesa ver el _id que le asigna Mongo a cada registro, por ende esto la capa repository se encarga de eliminarlo). 
- Los DAOs/CRUDs son los que se encargan de persistir la información en la base de datos.

A su vez, siguen estando los Middlewares que controlan información y lanzan errores en caso de no ingresar información necesaria para el Request. 

Aproveche toda esta entrega para tratar de implementar los try/catch, de manera que la aplicación no rompa y que se pueda seguir con mas facilidad donde suceden los errores. 

Por último, para convertir los datos a/desde DTO, se armaron varias funciones aparte, para tratar de reutilizar algo de código.

Creo que ahora la aplicación quedo algo mas ordenada (al menos encontrar los errores y arreglarlo me fue super sencillo, y me di cuenta que implementando los DTO, me fue mas sencillo modificar si era necesario los datos a mostrar al cliente / a persistir en la base de datos) y no crashea tanto como antes.

Tener presente que lo del patron Repository solo fue aplicado a la sección de productos/carritos (hay otros 2 routers que no lo aplique).

Si no era tan así lo del patron Repository, avisarme y lo modifico, lo realice a como lo entendi. Y obviamente, gracias de antemano por todo el feedback! Alan.

----------------------///----------------------

Desafio 36 (SEGUNDA ENTREGA)
Buenas tardes. Hago reentrega de la tercer preentrega.

Tome nota de varias cosas indicadas en la devolución, y en base a eso (y otros errores que yo fui viendo al probarlo), implemente los siguientes cambios:
- Todos los endpoint ahora devuelven información en formato JSON (o error en el mismo formato si fuera el caso). 
- Se corrigieron algunos errores que tenian ciertos endpoints, ademas de los que me marcaste en la corrección (nada extremo, si no que capaz en algun dato faltaba validación, o no se reflejaba correctamente en MongoAtlas, cosas así, pequeñas)
- Se termino la parte del carrito que era lo que había faltado.
- Se incorporó la parte de cargar la foto de perfil.
- Se entrega la colección de Postman utilizada para realizar las pruebas. Cada endpoint tiene un pequeño comentario de que debería hacer y como se debería utilizar. Se que esto no era necesario pero capaz es de ayuda.

Sigue faltando implementar mas mejoras para que el proyecto sea mucho mas estable y solido, como por ejemplo:
- Validar que solo se pueda editar el carrito de un usuario si el mismo esta logueado, en caso contrario arrojar error 401
- Validar que si agrego 2 productos iguales al carrito, se agrupen.
- Validar el dato que se ingresa al intentar cambiar la cantidad de unidades de un producto.
- Armar alguna especie de lógica de usuarios comunes/admin para poder cargar, editar y eliminar productos (con esto me refiero a que un usuario comun si quisiera cargar productos, debería dar error 401/403 (no recuerdo cual es el apropiado), pero si lo hace un user admin no debería haber problemas)
- Armar la lógica para guardar las compras hechas en algun apartado de orders (y que lo pueda ver tanto el usuario admin como cada usuario con sus propias compras a través de algún endpoint en particular)
- Refactorizar codigo (en especial del DAOs de Carrito y de los controllers)

Falta seguir avanzando bastante de cara al proyecto final, pero creo que para lo que es la tercer preentrega ahora está bastante mas alineado. 

Al igual que antes, está el ejemplo de example.env.js para poder levantar el servidor localmente.

Cualquier cosa avisarme, y muchas gracias de antemano! 

Desafio 36 (PRIMER ENTREGA)
Buenas noches. Hago entrega de la tercer preentrega.

La misma aún no está terminada, dado que faltan 2 o 3 puntos de la consigna, pero si está bastante avanzado.

El link de Heroku es: https://tercer-preentrega.herokuapp.com/api/productos

Falta implementar los siguientes puntos:
- No está para cargar la foto de perfil.
- No está hecha la validación del número de telefono a cargar (pero si se carga correctamente, con el +codigo de pais + codigo de area + telefono, al hacer un pedido te llega el wpp)
- Hay archivos viejos que deberían eliminarse (esencialmente los contenedores y daos de otras formas de persistencia, y algun middlewares obsoleto)

Tambien tener presente que el carrito aún no cumple todas las funciones de un carrito (por ejemplo no se puede eliminar un producto en particular, ni calcula el total, no puede agregar productos directamente del carrito, etc), dado que por una cuestión de tiempo no llegue a hacerlo.

Pero si está incorporado el resto de pedidos de la consigna:
- Hay una sección de mi perfil que trae los datos
- Se puede loguear, desloguear y registrarse
- En el caso de que se produzca algun error al registrarse (como usuario ya registrado) o al loguearse (como pass invalida), redirige a pestañas correspondientes
- Cada vez que alguien se registra, envia un mail al mail que aclaremos en variables de entorno
- Cada vez que se hace un pedido, envia un wpp al usuario (siempre y cuando haya ingresado bien el numero manualmente al registrarse, dado que aun no implemente el validador), así como el mail y el wpp al admin, lo cual tiene presente las variables de entorno para definir el destinatario
- Los render tienen presente si el usuario esta logueado o no (si esta logueado, figura el boton de cerrar sesion, pero en caso contrario figura el de iniciar sesión)
- En caso de que quiera agregar productos al carrito sin estar logueado, te redirige al login.
- Posee habilitado el modo CLUSTER y FORK. Por defecto arranca en FORK, pero en caso de querer el modo CLUSTER, se debe ejecutar node server.js -m CLUSTER (-m o --MODE es el parametro que identifica el modo de arranque)

En el caso de levantar el proyecto localmente, se debe configurar el archivo .env siguiendo el modelo de example.env.js, guiandose por los comentarios.

En caso de revisar el proyecto en Heroku, los mails al registrarse y al hacer un pedido se envian a una casilla de Nodemailer, por lo que no vas a poder chequearlo, pero en caso de haber cargado correctamente el numero de telefono al registrarse, si debería llegarte el wpp de confirmación.

El frontend es algo hiperbásico simplemente para ir cumpliendo con las cosas de la consigna, por eso el formato bastante básico.

De antemano te agradezco por el feedback, y mientras voy incorporando lo que me falta a medida que lo voy haciendo.

PD: pensadolo bien, para que el envio de mensajes de Heroku funcione, debería mandarse sin las comillas "join then-route" al +1 415 523 8886 para validar el número. La otra opción es probarlo de manera local configurando las variables de entorno a una cuenta de Twilio propia.