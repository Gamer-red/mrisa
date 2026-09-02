const express = require('express');
const router = express.Router();
const { crearOrdenProduccion, crearProceso, crearOrdenProceso, obtenerProcesosOrden, obtenerOrdenProduccion, obtenerOrdenProduccionid,obtenerOrdenesOperador,obtenerProcesosDisponibles,
iniciarEjecucion,registrarProduccion,pausarEjecucion,reanudarEjecucion,terminarEjecucion,obtenerHistorialEjecucion, obtenerEmpleadosOperador,obtenerHistorialOrden } = require('../../../controllers/produccionController');

router.post('/orden', crearOrdenProduccion);

router.get('/orden', obtenerOrdenProduccion)

router.get('/empleados-operador', obtenerEmpleadosOperador);

router.post('/operador/iniciar', iniciarEjecucion);

router.post('/proceso', crearProceso);

router.post('/orden-proceso', crearOrdenProceso);

router.get('/orden/:id/procesos', obtenerProcesosOrden);

router.get('/orden/:id/historial', obtenerHistorialOrden);

router.get('/:id', obtenerOrdenProduccionid)

router.get('/operador/ordenes', obtenerOrdenesOperador);

router.get('/operador/procesos/:idOrden', obtenerProcesosDisponibles);

router.post('/operador/registrar', registrarProduccion);

router.post('/operador/pausar', pausarEjecucion);

router.post('/operador/reanudar', reanudarEjecucion);

router.post('/operador/terminar', terminarEjecucion);

router.get('/operador/historial/:idEjecucion', obtenerHistorialEjecucion);


module.exports = router;



