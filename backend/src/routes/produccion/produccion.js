const express = require('express');
const router = express.Router();
const { crearOrdenProduccion, crearProceso, crearOrdenProceso,obtenerProcesos, obtenerProcesosOrden, iniciarEjecucion, pausarEjecucion, reanudarEjecucion, terminarEjecucion, registrarProduccion, registrarScrap, obtenerEjecucion, obtenerOrdenProduccion, obtenerOrdenProduccionid} = require('../../../controllers/produccionController');

router.post('/orden', crearOrdenProduccion);

router.get('/orden', obtenerOrdenProduccion)

router.post('/proceso', crearProceso);

router.post('/orden-proceso', crearOrdenProceso);

router.get('/proceso/:id_Orden', obtenerProcesos)

router.get('/orden/:id/procesos', obtenerProcesosOrden);

router.post('/ejecucion/iniciar', iniciarEjecucion);

router.put('/ejecucion/:id/pausar', pausarEjecucion);

router.put('/ejecucion/:id/reanudar', reanudarEjecucion);

router.put('/ejecucion/:id/terminar', terminarEjecucion);

router.post('/ejecucion/:id/produccion', registrarProduccion);

router.post('/ejecucion/:id/scrap', registrarScrap);

router.get('/ejecucion/:id', obtenerEjecucion);

router.get('/:id', obtenerOrdenProduccionid)

module.exports = router;



