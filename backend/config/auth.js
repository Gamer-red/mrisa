require('dotenv').config();

module.exports = {
    // Clave secreta para firmar los tokens (cámbiala por una más segura)
    jwtSecret: process.env.JWT_SECRET || 'mrysa2026',
    // Tiempo de expiración del token
    jwtExpiresIn: '24h',
    // Salt rounds para bcrypt
    saltRounds: 10
};