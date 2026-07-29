const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó token de autenticación'
        });
    }

    // El formato esperado: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido'
        });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, jwtSecret);
        req.usuario = decoded; // Guardar la información del usuario en la request
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'El token ha expirado'
            });
        }
        
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};

// Middleware para verificar roles
const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const { id_rol, rol } = req.usuario;
        
        // Verificar si el rol del usuario está en los roles permitidos
        if (!rolesPermitidos.includes(id_rol) && !rolesPermitidos.includes(rol)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a este recurso'
            });
        }
        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
};