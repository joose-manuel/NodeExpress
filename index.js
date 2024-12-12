import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; // Importar el módulo morgan
import usuariosRouter from './routes/usuarios.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Middleware para logging
app.use(morgan('combined')); // Utilizaremos el formato 'combined' para logs detallados

// Middleware para analizar JSON
app.use(express.json());

// Rutas de tu aplicación
app.use('/api', usuariosRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});