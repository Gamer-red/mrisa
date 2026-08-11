const express = require('express');
const router = express.Router();
const { crearMaterial, obtenerMateriales, obtenerMaterialPorId, eliminarMaterialPorid, materialActualizado} = require('../../../controllers/materialController');

router.post('/', crearMaterial);

router.get('/', obtenerMateriales);

router.get('/:id', obtenerMaterialPorId);

router.delete('/:id', eliminarMaterialPorid);

router.put('/:id', materialActualizado)

module.exports = router;