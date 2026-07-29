const { pool } = require('../src/config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiresIn } = require('../config/auth');

// Función para generar token JWT
const generarToken = (usuario) => {
    return jwt.sign(
        { 
            id_usuario: usuario.id_usuario,
            correo: usuario.correo,
            id_rol: usuario.id_rol,
            rol: usuario.nombre_rol
        },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    );
};

// Controlador de login
const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        // Validar que los campos no estén vacíos
        if (!correo || !contrasenia) {
            return res.status(400).json({
                success: false,
                message: 'Correo y contraseña son requeridos'
            });
        }

        // Buscar usuario por correo con JOIN para obtener el nombre del rol
        const query = `
            SELECT 
                u.id_usuario,
                u.correo,
                u.contrasenia,
                u.id_rol,
                r.nombre_rol
            FROM usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.correo = $1
        `;
        
        const result = await pool.query(query, [correo]);

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const usuario = result.rows[0];

        // VERIFICAR CONTRASEÑA
        // Como tienes contraseñas en texto plano, comparación directa
        // NOTA: Más adelante deberías migrar a contraseñas hasheadas
        const contraseniaValida = (contrasenia === usuario.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // Generar token JWT
        const token = generarToken(usuario);

        // No enviar la contraseña en la respuesta
        delete usuario.contrasenia;

        // Respuesta exitosa
        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                id_rol: usuario.id_rol,
                rol: usuario.nombre_rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

// Controlador para verificar token (validar sesión)
const verifyToken = async (req, res) => {
    try {
        // El token ya fue verificado por el middleware
        // req.usuario contiene la información del token
        res.json({
            success: true,
            message: 'Token válido',
            usuario: req.usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar token'
        });
    }
};

module.exports = {
    login,
    verifyToken
};