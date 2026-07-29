const express = require('express');
const router = express.Router();
const { 
    login, 
    verifyToken
} = require('../../controllers/authcontroller');

const { verificarToken } = require('../../middleware/authMiddleware');

// Ruta pública de login
router.post('/login', login);

// Rutas protegidas (requieren token)
router.get('/verify', verificarToken, verificarToken);

module.exports = router;