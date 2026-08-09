const express = require('express');
const router = express.Router();
const { crearMaterial} = require('../../../controllers/materialController');

router.post('/', crearMaterial);

module.exports = router;