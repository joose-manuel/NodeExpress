import { pool } from '../routes/dbj.js';  // Importar la conexión a la base de datos

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');  // Usar await
        res.json(rows);  // Enviar la lista de usuarios como respuesta
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la lista de usuarios');
    }
};

// Controlador para crear un nuevo usuario
export const postUsuarios = async (req, res) => {
    const { Nombre, Email, Edad, estado } = req.body;
    try {
        await pool.query('INSERT INTO usuarios (Nombre, Email, Edad, estado) VALUES (?, ?, ?, ?)', [Nombre, Email, Edad, estado]);  // Usar await
        res.send('Usuario añadido con éxito');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al añadir el usuario');
    }
};

// Controlador para actualizar un usuario
export const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Edad, estado } = req.body;
    try {
        await pool.query('UPDATE usuarios SET Nombre = ?, Email = ?, Edad = ?, estado = ? WHERE id = ?', [Nombre, Email, Edad, estado, id]);  // Usar await
        res.send('Usuario actualizado con éxito');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el usuario');
    }
};

// Controlador para eliminar un usuario
export const deleteUsuarios = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);  // Usar await
        res.send('Usuario eliminado con éxito');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el usuario');
    }
};
