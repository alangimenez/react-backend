const optionsSql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'pruebacoderhouse'
    }
}

const optionsSqlite = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "./mydb.sqlite"
    }
  };

module.exports = {optionsSql, optionsSqlite};