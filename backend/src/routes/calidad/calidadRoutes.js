const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../../../middleware/authMiddleware');
const {
    crearInspeccion,
    obtenerInspecciones,
    obtenerInspeccionPorId,
    actualizarInspeccionPorId,
    eliminarInspeccionPorId
} = require('../../../controllers/calidadController');

// ========== RUTAS PROTEGIDAS (SOLO CALIDAD) ==========

// POST - Crear una nueva inspección (solo Calidad)
router.post(
    '/inspeccion',
    verificarToken,
    verificarRol(['calidad']),
    crearInspeccion
);

// GET - Obtener todas las inspecciones (solo Calidad)
router.get(
    '/inspeccion',
    verificarToken,
    verificarRol(['calidad']),
    obtenerInspecciones
);

// GET - Obtener una inspección por ID (solo Calidad)
router.get(
    '/inspeccion/:id',
    verificarToken,
    verificarRol(['calidad']),
    obtenerInspeccionPorId
);

router.put(
    '/inspeccion/:id',
    verificarToken,
    verificarRol(['calidad']),
    actualizarInspeccionPorId
);

router.delete(
    '/inspeccion/:id',
    verificarToken,
    verificarRol(['calidad']),
    eliminarInspeccionPorId
);

module.exports = router;