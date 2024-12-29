import mysql from 'mysql2';

// Configuración de la conexión con más tiempo de espera
const pool = mysql.createPool({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'ZRKobmgHCwCxqovVYXwzmZHQRgpHaJtJ',
  database: 'railway',
  port: 54392,
  connectTimeout: 10000,  // Aumenta el tiempo de espera a 10 segundos
  acquireTimeout: 10000,  // Aumenta el tiempo de espera para obtener una conexión del pool
});

export { pool };
