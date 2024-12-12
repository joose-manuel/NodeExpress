import express from 'express';
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from '../controller/controllerUsuario.js';  // Importar los controladores

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', getUsuarios);

// Subir un nuevo usuario
router.post('/usuarios', postUsuarios);

// Actualizar un usuario
router.put('/usuarios/:id', putUsuarios);

// Eliminar un usuario
router.delete('/usuarios/:id', deleteUsuarios);

export default router;  // Exportar las rutas
