const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../../../middleware/authMiddleware');
const { uploadFields, handleUploadError } = require('../../../middleware/uploadMiddleware');
const { crearEmpleado, obtenerEmpleados } = require('../../../controllers/empleadosController');

// ========== RUTAS PROTEGIDAS (SOLO RH) ==========

// POST - Crear un nuevo empleado (solo Recursos Humanos)
router.post(
    '/', 
    verificarToken,                    // 1. Verificar que el usuario esté autenticado
    verificarRol(['recursos_humanos']), // 2. Verificar que sea de RH
    uploadFields,                      // 3. Procesar los archivos
    handleUploadError,                 // 4. Manejar errores de Multer
    crearEmpleado                      // 5. Crear el empleado
);

// GET - Obtener todos los empleados (solo Recursos Humanos)
router.get(
    '/',
    verificarToken,
    verificarRol(['recursos_humanos']),
    obtenerEmpleados
);

module.exports = router;