import mysql from 'mysql2/promise'; // Cambiar a mysql2/promise

// Crear la conexión a la base de datos
export const pool = mysql.createPool({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'ZRKobmgHCwCxqovVYXwzmZHQRgpHaJtJ',
    database: 'railway',
    port: 54392
});

// Probar la conexión
pool.getConnection()
    .then((connection) => {
        console.log('Conexión exitosa a la base de datos');
        connection.release();  // Liberar la conexión después de usarla
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos: ', err);
    });
