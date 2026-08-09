const express = require('express');
const router = express.Router();
const {crearMantenimiento} = require('../../../controllers/mantenimientoController')

router.post ('/', crearMantenimiento);

module.exports = router;