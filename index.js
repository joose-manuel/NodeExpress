import express from 'express';
import cors from 'cors'; // Importar el módulo cors
import usuariosRouter from './routes/usuarios.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir solicitudes desde cualquier origen (por ahora).
// Ajusta esto según tus necesidades de seguridad.
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

// Rutas de tu aplicación
app.use('/api', usuariosRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});