const express = require('express');
const router = express.Router();
const {crearMantenimiento} = require('../../../controllers/mantenimientoController')

router.post ('/Crearmantenimiento', crearMantenimiento);

module.exports = router;