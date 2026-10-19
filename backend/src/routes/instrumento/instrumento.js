const express = require('express');
const router = express.Router();
const{crearInstrumento} = require ('../../../controllers/instrumentoController')

router.post ('/Crearinstrumento', crearInstrumento);

module.exports = router;