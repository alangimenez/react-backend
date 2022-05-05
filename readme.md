Desafio 38
Buenas noches. Hago entrega del desafio 38 - Arquitectura en capas.

El proyecto ya traia bastante incorporado la arquitectura por capas, sin embargo, se termino de implementar correcciones para que quede bien reflejado.

- La carpeta "config" posee las configuraciones para el proyecto (en este caso, solamente para el logger y variables de entorno)
- La carpeta "router" posee solamente las rutas y solicitudes al controller para procesar peticiones
- La carpeta "models" posee solo los modelos de objetos que se implementarán en las BD
- La carpeta "persistencia" posee los metodos para interactuar con la Base de Datos, con los CRUDs y DAOs correspondientes. Vale aclarar que hay persistencia para MongoDB, Firebase, Memoria y FileSystem, pero SOLO se debe utilizar el de MongoDB (el resto no está probado, y como hice cambios en los controller, es muy probable que den error. No los elimine porque luego pienso adaptarlos)
- La carpeta "views" contiene los handlebars para renderizar vistas en los endpoint de los router gzip y process
- La carpeta "middlewares" solo posee middlewares, que hacen controles en ciertos endpoints
- La carpeta "infoLog" guarda los logs dependiendo del tipo de mensaje que se dispara. La configuración del logger está en la carpeta correspondiente
- La carpeta "utils" solo posee una función llamada en un controlador, y lo deje aparte dado que lo tome de otro desafio
- La carpeta "databases" posee accesos a las bases de datos correspondientes. La configuración también podría estar en la carpeta config, pero decidi dejarla aca porque me parecio algo muy especifico de esta carpeta en particular. 
- La carpeta "assets" posee los archivos para persistir la información en caso de utilizar como metodo de persistencia FileSystem, una vez que corrija bien el CRUD del mismo.
- La carpeta "controller" posee la logica para recibir las peticiones de parte de los router, hacer peticiones de información a persistencia, y devolver información al peticionante, sea que la request haya sido correcta o invalida. 

Como en desafio anteriores, en el desafio va un archivo sample.env.js para poder levantar el proyecto con las variables de entorno adecuadas.

Adicionalmente, tener presente que los endpoint de los router carrito y productos, devuelven información en formato JSON. Sin embargo, los endpoints de los routes gzip y process devuelven información en formato template, dado que así lo requeria la consigna en su momento.

Gracias de antemano por el feedback! Alan.



Desafio 36 (EN PROCESO DE CORRECCIONES)
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