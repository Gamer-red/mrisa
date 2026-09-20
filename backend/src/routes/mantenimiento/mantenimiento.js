const express = require('express');
const router = express.Router();
const {crearMantenimiento, mantenimientoLista} = require('../../../controllers/mantenimientoController')

router.post ('/Crearmantenimiento', crearMantenimiento);
router.get('/MantenimientoLista', mantenimientoLista)

module.exports = router;