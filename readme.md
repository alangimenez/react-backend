Desafio 36
Buenas noches. Hago entrega de la tercer preentrega.

La misma aún no está terminada, dado que faltan 2 o 3 puntos de la consigna, pero si está bastante avanzado.

El link de Heroku es: https://tercer-preentrega.herokuapp.com/api/productos

Falta implementar los siguientes puntos:
- No está para cargar la foto de perfil.
- No están hechos los test de Artillery
- No está hecha la validación del número de telefono a cargar (pero si se carga correctamente, con el +codigo de pais + codigo de area + telefono, al hacer un pedido te llega el wpp)
- Hay archivos viejos que deberían eliminarse (esencialmente los contenedores y daos de otras formas de persistencia, y algun middlewares obsoleto)

Tambien tener presente que el carrito aún no cumple todas las funciones de un carrito (por ejemplo no se puede eliminar un producto en particular, ni calcula el total, no puede agregar productos directamente del carrito, etc), dado que por una cuestión de tiempo no llegue a hacerlo.

Pero si está incorporado el resto de pedidos de la consigna:
-Hay una sección de mi perfil que trae los datos
-Se puede loguear, desloguear y registrarse
-En el caso de que se produzca algun error al registrarse (como usuario ya registrado) o al loguearse (como pass invalida), redirige a pestañas correspondientes
-Cada vez que alguien se registra, envia un mail al mail que aclaremos en variables de entorno
-Cada vez que se hace un pedido, envia un wpp al usuario (siempre y cuando haya ingresado bien el numero manualmente al registrarse, dado que aun no implemente el validador), así como el mail y el wpp al admin, lo cual tiene presente las variables de entorno para definir el destinatario
-Los render tienen presente si el usuario esta logueado o no (si esta logueado, figura el boton de cerrar sesion, pero en caso contrario figura el de iniciar sesión)
-En caso de que quiera agregar productos al carrito sin estar logueado, te redirige al login.

En el caso de levantar el proyecto localmente, se debe configurar el archivo .env siguiendo el modelo de example.env.js, guiandose por los comentarios.

En caso de revisar el proyecto en Heroku, los mails al registrarse y al hacer un pedido se envian a una casilla de Nodemailer, por lo que no vas a poder chequearlo, pero en caso de haber cargado correctamente el numero de telefono al registrarse, si debería llegarte el wpp de confirmación.

El frontend es algo hiperbásico simplemente para ir cumpliendo con las cosas de la consigna, por eso el formato bastante básico.

De antemano te agradezco por el feedback, y mientras voy incorporando lo que me falta a medida que lo voy haciendo.