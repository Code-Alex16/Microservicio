import mysql from 'mysql2';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config.js';

let conexion;

const dbconfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
};

export function conMysql() {
  conexion = mysql.createConnection(dbconfig);

  conexion.connect(err => {
    if (err) {
      console.log('[db-error]', err);
      setTimeout(conMysql, 200); // reconexión automática
    } else {
      console.log('✅ DB conectada');
    }
  });

  conexion.on('error', err => {
    console.log('[db-error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql(); // reconectar si se pierde conexión
    } else {
      throw err;
    }
  });
}

export { conexion };
