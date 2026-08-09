const express = require('express');
const router = express.Router();
const { crearMaquina, obtenerMaquina, obteberNaquinaPorId, maquinaActualizada, eliminarMaquinaPorId} = require('../../../controllers/maquinaController');

// Ruta para crear una nueva máquina (ALTA)
router.post('/', crearMaquina);

router.get('/',obtenerMaquina);

router.get('/:id', obteberNaquinaPorId);

router.put('/:id', maquinaActualizada);

router.delete('/:id', eliminarMaquinaPorId);

module.exports = router;