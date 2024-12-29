import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; // Importar el módulo morgan
import usuariosRouter from './routes/usuarios.js';  // Ajusta la ruta al archivo donde se encuentra el enrutador

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Middleware para logging
app.use(morgan('combined')); // Utilizamos el formato 'combined' para logs detallados

// Middleware para analizar JSON
app.use(express.json());

// Usar las rutas de usuarios
app.use('/api', usuariosRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
