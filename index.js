import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

// ... Rest of your code remains the same

// Configuración de CORS (ajusta los orígenes permitidos según tus necesidades)
app.use(cors({
  origin: ['https://tudominio.com', 'https://otrodominio.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para analizar JSON
app.use(express.json());

// Helmet para seguridad HTTP
app.use(helmet());

// Limitar las solicitudes para prevenir ataques DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limitar a 100 solicitudes por IP en 15 minutos
});
app.use(limiter);

// Conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Ejemplo de ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Otras rutas de tu aplicación...

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});