const express = require('express');
const router = express.Router();
const { crearMaquina, obtenerMaquinas, obteberMaquinaPorId, maquinaActualizada, eliminarMaquinaPorId} = require('../../../controllers/maquinaController');

// Ruta para crear una nueva máquina (ALTA)
router.post('/maquinas', crearMaquina);

router.get('/maquinas',obtenerMaquinas);

router.get('/:id', obteberMaquinaPorId);

router.put('/:id', maquinaActualizada);

router.delete('/:id', eliminarMaquinaPorId);

module.exports = router;