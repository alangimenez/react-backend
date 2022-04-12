Desafio 32
Buenas noches, espero que andes muy bien!



Creo que me hice un poco de lio con esta entrega, pero lo voy a entregar igual con lo que hice porque, lo que hice ya lo hice. Con respecto a lo que me indicas que no tiene el metodo login, es verdad! Pero porque no lo hice sobre esa entrega, lo hice sobre los desafios que tenian la api productos/carritos. Quizas aca me equivoque yo y recien ahora que me lo marcas me doy cuenta. Igual al menos quiero entregar lo que hice para despues de ultima corregirlo (aunque esto explica porque no esta la ruta login y porque no esta sockets y mensajes).



Respecto al logger info en los controllers, están ahi dado que cada endpoint tiene su propio controller que maneja la logica. Como la consigna pedia hacer un  log de todas las peticiones al servidor (es decir, entiendo que a cualquier endpoint), el lugar donde debía agregarlo por como tengo estructurado mi proyecto era en el controller (lo pude haber puesto en el router, pero me parecio mejor dejar limpio el router y agregarlo dentro de la función que manejaba la lógica). 



Se cambio el archivo log4js a la carpeta config, y desde ahi se crean los loggers, que quedarán guardados en la carpeta infoLog. 



Todas las pruebas de performance quedaron sueltitas en la carpeta raíz del proyecto. Adicionalmente, se agrego un pequeño informe, aunque literalmente no supe bien que poner (hice comparaciones entre las pruebas de Artillery y el --prof de Node.js). Las pruebas de performance se hicieron corriendo el escenario de que la ruta /info, antes de mandar la información, hace un console.log y NO hace un console.log (esto sería los 2 escenarios que se compararon). Al menos eso entendí de la consigna. 



Perdón por el error del desafío del cual partir, pero bueno, ya que lo habia hecho todo al resto, al menos quería entregarlo con lo que pude hacer.



PD: el informe lo deje en Word, porque si lo imprimo en .pdf, no se porque desaparecían las imágenes! 
PD2: para poder inicializar el proyecto, se debe crear un archivo .env, que debe ser como el archivo example.env.js, donde se setea la variable URI_MONGODB para poder conectarse a la base de datos correspondiente. Está es la única variable de entorno que necesita para funcionar.