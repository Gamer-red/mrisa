const express = require('express');
const router = express.Router();
const { crearOrdenProduccion} = require('../../../controllers/produccionController');

router.post('/', crearOrdenProduccion);

module.exports = router;



