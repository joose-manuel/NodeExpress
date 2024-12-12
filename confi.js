const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function getUsuarios() {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}