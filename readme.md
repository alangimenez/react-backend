Desafio 42
Buenos días, espero que andes muy bien! Hago entrega del desafio 42.

Para la parte del cliente http para probar la aplicación, se creó un minicliente frontend que consume la API vía Axios para ir probando las diferentes funcionalidades (get, update, post, etc). Simplemente se deben cargar los datos correspondientes, y los resultados se mostrarán por consola (sea una operación exitosa o fallida).

Para la parte del testing, se utilizó supertest, chai y mocha, y es una batería de test que lo que hacen es ir probando cada endpoint, pasandole datos correctos, incorrectos o inexistentes, verificando que los resultados sean los esperados sabiendo cuales fueron los datos ingresados. En el script del test, se seteó manualmente el tiempo de timeout, dado que la conexión a la base de datos solo se realiza al hacer el primer request, y si no lo configuraba, siempre me daba timeout (dado que no alcanzaba a conectarse a la base de datos en el timeout por default, que es de 2s).

Como siempre, se adjunta el archivo sample.env.js, para poder dar las configuraciones necesarias para levantar el proyecto. Las carpetas importantes para este desafio son las de test y clienteHttp.

Como siempre, agradezco el feedback de antemano! Saludos! Alan.