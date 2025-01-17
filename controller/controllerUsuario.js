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
    const { Nombre, Email, Edad, estado, Contrasena } = req.body; // Asegurarse de que 'Contrasena' esté en la solicitud

    // Validación de datos
    if (!Nombre || !Email || !Edad || !estado || !Contrasena) {
        return res.status(400).send({ error: 'Todos los campos son requeridos' });
    }

    try {
        // Inserción en la base de datos
        await pool.query('INSERT INTO usuarios (Nombre, Contrasena, Email, Edad, estado) VALUES (?, ?, ?, ?, ?)', [Nombre, Contrasena, Email, Edad, estado]);
        
        // Respuesta exitosa
        res.status(201).json({
            message: 'Usuario añadido con éxito',
            usuario: { Nombre, Contrasena, Email, Edad, estado }
        });
    } catch (err) {
        // Manejo de errores, incluyendo los datos enviados
        console.error('Error al añadir el usuario:', err);
        res.status(500).send({
            error: `Error al añadir el usuario ${Nombre} con los siguientes datos: `, 
            details: err.message,
            sentData: { Nombre, Contrasena, Email, Edad, estado }  // Muestra los campos enviados
        });
    }
};

// Controlador para actualizar un usuario
export const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Edad, estado, Contrasena } = req.body; // Asegurarse de que 'Contrasena' esté presente

    try {
        await pool.query('UPDATE usuarios SET Nombre = ?, Email = ?, Edad = ?, estado = ?, Contrasena = ? WHERE id = ?', 
        [Nombre, Email, Edad, estado, Contrasena, id]);  // Usar await
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
export const loginUsuario = async (req, res) => {
    const { Email, Contrasena } = req.body;

    if (!Email || !Contrasena) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        const [usuario] = await pool.query('SELECT * FROM usuarios WHERE Email = ? AND Contrasena = ?', [Email, Contrasena]);

        if (usuario.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        return res.status(200).json({
            message: 'Login exitoso',
            usuario: usuario[0], // Solo devuelve los datos del usuario autenticado
        });
    } catch (err) {
        console.error('Error en el login:', err);
        return res.status(500).json({ error: 'Error al procesar el login', details: err.message });
    }
};
