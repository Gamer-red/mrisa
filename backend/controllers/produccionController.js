const { data } = require('react-router-dom');
const { pool } = require('../src/config/db');

const crearOrdenProduccion = async (req, res) => {

    try{
        const{
            id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, numero_plano, lote, material, grado_material, notas
        } = req.body

        console.log('Datos recibidos en backend:', req.body);

        const query = `INSERT INTO orden_produccion  (id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, Numero_plano, lote, material, grado_material, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, Numero_plano, lote, material, grado_material,notas`;

        const values = [
            id_material || null, 
            producto ? producto.trim() : null,
            cliente ? cliente.trim() : null,
            cantidad || null,
            fecha_inicio || null,
            fecha_entrega || null,
            prioridad ? prioridad.trim() : null,
            numero_plano ? numero_plano.trim() : null,
            lote ? lote.trim() : null,
            material ? material.trim() : null,
            grado_material ? grado_material.trim():null,
            notas ? notas.trim():null
        ]

        const result = await pool.query(query, values); 
        const nuevaOrdenProduccion = result.rows[0];
         res.status(201).json({
            success: true,
            message: 'orden creada exitosamente',
            data: nuevaOrdenProduccion
        });

        console.log('Resultado de la consulta:', result);


    }catch (error) {
        console.error('Error al crear la orden:', error);

        // Manejar errores específicos de PostgreSQL
        if (error.code === '23505') { // Violación de unique constraint
            return res.status(409).json({
                success: false,
                message: 'Ya existe una orden con ese nombre',
                error: error.detail
            });
        }
        // Error genérico
        res.status(500).json({
            success: false,
            message: 'Error al crear la orden;',
            error: error.message
        });
    }
}

const crearProceso = async (req, res) => {
    try {
        const {
            nombre_operacion,
            tipo_proceso,
            id_maquina,
            tiempo_estimado,
            notas,
            id_orden,
            numero_paso  // ← Agrega esto
        } = req.body;

        // Iniciar transacción
        await pool.query('BEGIN');

        // 1. Insertar el proceso
        const queryProceso = `INSERT INTO proceso (nombre_operacion, tipo_proceso, id_maquina, tiempo_estimado, notas) 
                              VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        
        const valuesProceso = [
            nombre_operacion.trim(),
            tipo_proceso.trim(),
            id_maquina || null,
            tiempo_estimado || null,
            notas ? notas.trim() : null
        ];

        const resultProceso = await pool.query(queryProceso, valuesProceso);
        const nuevoProceso = resultProceso.rows[0];

        // 2. Crear la relación en orden_proceso
        const queryRelacion = `INSERT INTO orden_proceso (id_ordenproduccion, id_proceso, numero_paso) 
                               VALUES ($1, $2, $3)`;
        
        await pool.query(queryRelacion, [
            id_orden,
            nuevoProceso.id_proceso,
            numero_paso || 1  // Si no se envía, por defecto 1
        ]);

        // Confirmar transacción
        await pool.query('COMMIT');

        res.status(201).json({
            success: true,
            message: 'Proceso creado y asociado a la orden exitosamente',
            data: nuevoProceso
        });

    } catch (error) {
        // Rollback en caso de error
        await pool.query('ROLLBACK');
        
        console.error('Error al crear proceso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el proceso',
            error: error.message
        });
    }
};

const crearOrdenProceso = async (req, res)=>{
    try{
        const {
            id_ordenproduccion,
            id_proceso,
            numero_paso
        } = req.body;

        const query = `INSERT INTO orden_proceso (
            id_ordenproduccion,
            id_proceso,
            numero_paso
        ) VALUES ($1, $2, $3) RETURNING *`;

        const values = [
            id_ordenproduccion,
            id_proceso,
            numero_paso
        ];

        const result = await pool.query(query, values);
        const nuevaOrdenProceso = result.rows[0];

        res.status(201).json({
            success: true,
            message:'Proceso agregado a la orden exitosamente',
            data: nuevaOrdenProceso
        });
    }catch(error){
        console.error('Error al agregar proceso a la orden:', error);

        res.status(500).json({
            success: false,
            message:'Error al agregar el proceso a la orden',
            error: error.message
        });
    }
};

const cambiarEstadoOrden = async (req, res)=>{
    try{
        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA','CANCELADA'];

        if (!estadosValidos.includes(estado)){
            return res.status(400).json({
                success: false,
                message:'Estado invalido'
            });
        }

        const checkQuery = 'SELECT id_orden FROM orden_produccion WHERE id_orden = $1';

        const checkResult = await pool.query(checkQuery,[id]);

        if(checkResult.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:'Orden no encontrada'
            });
        }

        const query = `UPDATE orden_produccion SET estado = $1 WHERE id_orden = $2 RETURNING *`;

        const result = await pool.query(query, [estado,id]);
        const ordenActualizada = result.rows[0];

        res.status(200).json({
            success:true,
            message:`Estado actualizado a ${estado} exitosamente`,
            data:ordenActualizada
        })

    }catch(error){
        console.error('Error al cambiar estado en orden:', error);
        res.status(500).json({
            success: false,
            message:'Errro al cambiar el estado de la orden',
            error:error.message
        });
    }
}

const obtenerOrdenProduccion = async (req, res) =>{
    try{

        const query = `select id_orden, id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, numero_plano, lote, material, grado_material, notas from orden_produccion ORDER BY id_orden ASC`

        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            data: result.rows
        });


    }catch(error){
         console.error('Error al obtener procesos:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener las ordenes',
            error: error.message
        });
    }
}

const obtenerOrdenProduccionid = async (req, res)=>{
     try{
            const { id } = req.params;

            const query = `SELECT id_orden, producto, cliente, cantidad, fecha_entrega FROM orden_produccion WHERE id_orden = $1`;

            const result = await pool.query(query,[id]);
            const orden = result.rows[0];

        if(!orden){
            return res.status(404).json({
                success:false,
                message:`no se encontro la maquina con el ID: ${id}`
            });
        }

        res.status(200).json({
            success:true,
            data:orden
        })
     }catch(error){
        console.error('Error al obtener maquina por ID', error);

        res.status(500).json({
            success:false,
            message:'Error al obtener la maquina',
            error:error.message
        });
     }
}

const obtenerProcesosOrden = async (req, res) => {
    try {

        const { id } = req.params;

        const query = `
            SELECT
                op.id_ordenproduccion,
                op.id_proceso,
                op.numero_paso,
                p.nombre_operacion,
                p.tipo_proceso,
                p.id_maquina,
                p.tiempo_estimado,
                p.notas
            FROM orden_proceso op
            INNER JOIN proceso p
                ON op.id_proceso = p.id_proceso
            WHERE op.id_ordenproduccion = $1
            ORDER BY op.numero_paso ASC
        `;

        const result = await pool.query(query, [id]);

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.error('Error al obtener los procesos de la orden:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los procesos de la orden',
            error: error.message
        });
    }
};

const obtenerOrdenesOperador = async (req, res) => {
    try {
        // 1.1 - Consulta SQL
        const query = `
            SELECT DISTINCT
    o.id_orden,
    o.producto,
    o.cliente,
    o.cantidad,
    o.prioridad,
    o.fecha_entrega,
    o.estado
FROM orden_produccion o
LEFT JOIN orden_proceso op ON o.id_orden = op.id_ordenproduccion
LEFT JOIN ejecucion_proceso e ON 
    e.id_ordenproduccion = o.id_orden 
    AND e.estado != 'TERMINADO'
WHERE o.estado = 'EN_PROCESO'
    AND e.id_ejecucion IS NULL
ORDER BY o.prioridad DESC, o.fecha_entrega ASC
        `;

        // 1.2 - Ejecutar consulta
        const result = await pool.query(query);

        // 1.3 - Verificar si hay resultados
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay órdenes disponibles para ejecución',
                data: []
            });
        }

        // 1.4 - Respuesta exitosa
        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error('Error al obtener órdenes para operador:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las órdenes disponibles',
            error: error.message
        });
    }
};

const obtenerProcesosDisponibles = async (req, res) => {
    try {
        const { idOrden } = req.params;

        // 2.1 - Validar que el ID sea válido
        if (!idOrden || isNaN(idOrden)) {
            return res.status(400).json({
                success: false,
                message: 'ID de orden inválido'
            });
        }

        // 2.2 - Consulta SQL
        const query = `
            SELECT 
                p.id_proceso,
                p.nombre_operacion,
                p.tipo_proceso,
                p.tiempo_estimado,
                m.nombre as maquina,
                op.numero_paso,
                e.id_ejecucion,
                e.estado as estado_ejecucion
            FROM orden_proceso op
            INNER JOIN proceso p ON op.id_proceso = p.id_proceso
            LEFT JOIN maquina m ON p.id_maquina = m.id_maquina
            LEFT JOIN ejecucion_proceso e ON 
                e.id_ordenproduccion = op.id_ordenproduccion 
                AND e.id_proceso = p.id_proceso
                AND e.estado != 'TERMINADO'
            WHERE op.id_ordenproduccion = $1
                AND (e.id_ejecucion IS NULL OR e.estado = 'PAUSADO')
            ORDER BY op.numero_paso ASC
        `;

        // 2.3 - Ejecutar consulta
        const result = await pool.query(query, [idOrden]);

        // 2.4 - Verificar resultados
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay procesos disponibles para esta orden',
                data: []
            });
        }

        // 2.5 - Respuesta exitosa
        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error('Error al obtener procesos disponibles:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los procesos disponibles',
            error: error.message
        });
    }
};

const iniciarEjecucion = async (req, res) => {
    try {
        const { id_orden, id_proceso, id_empleado } = req.body;

        if (!id_orden || !id_proceso || !id_empleado) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: id_orden, id_proceso, id_empleado'
            });
        }
        const checkQuery = `
            SELECT id_ejecucion, estado 
            FROM ejecucion_proceso 
            WHERE id_ordenproduccion = $1 
                AND id_proceso = $2 
                AND estado IN ('EN_PROCESO', 'PAUSADO')
        `;
        const checkResult = await pool.query(checkQuery, [id_orden, id_proceso]);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Este proceso ya tiene una ejecución activa o pausada',
                data: {
                    id_ejecucion: checkResult.rows[0].id_ejecucion,
                    estado: checkResult.rows[0].estado
                }
            });
        }

        
        await pool.query('BEGIN');

        const insertQuery = `
            INSERT INTO ejecucion_proceso (
                id_ordenproduccion,
                id_proceso,
                id_empleado,
                estado,
                fecha_inicio
            ) VALUES ($1, $2, $3, 'EN_PROCESO', CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const insertResult = await pool.query(insertQuery, [id_orden, id_proceso, id_empleado]);
        const nuevaEjecucion = insertResult.rows[0];

        
        const estadoQuery = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha
            ) VALUES ($1, 'EN_PROCESO', CURRENT_TIMESTAMP)
        `;
        await pool.query(estadoQuery, [nuevaEjecucion.id_ejecucion]);

        
        await pool.query('COMMIT');

        
        res.status(201).json({
            success: true,
            message: 'Ejecución iniciada exitosamente',
            data: nuevaEjecucion
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        
        console.error('Error al iniciar ejecución:', error);
        res.status(500).json({
            success: false,
            message: 'Error al iniciar la ejecución',
            error: error.message
        });
    }
};

const registrarProduccion = async (req, res) => {
    try {
        const { id_ejecucion, piezas, scrap } = req.body;

        // 4.1 - Validar campos obligatorios
        if (!id_ejecucion) {
            return res.status(400).json({
                success: false,
                message: 'El campo id_ejecucion es obligatorio'
            });
        }

        // 4.2 - Validar que al menos haya una pieza o scrap
        const piezasNum = parseInt(piezas) || 0;
        const scrapNum = parseInt(scrap) || 0;

        if (piezasNum === 0 && scrapNum === 0) {
            return res.status(400).json({
                success: false,
                message: 'Debes registrar al menos una pieza o scrap'
            });
        }

        // 4.3 - Verificar que la ejecución existe y está activa
        const checkQuery = `
            SELECT id_ejecucion, estado, id_ordenproduccion, id_proceso
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1
        `;
        const checkResult = await pool.query(checkQuery, [id_ejecucion]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ejecución no encontrada'
            });
        }

        const ejecucion = checkResult.rows[0];

        if (ejecucion.estado !== 'EN_PROCESO' && ejecucion.estado !== 'PAUSADO') {
            return res.status(400).json({
                success: false,
                message: `No se puede registrar producción en estado "${ejecucion.estado}"`
            });
        }

        // 4.4 - Iniciar transacción
        await pool.query('BEGIN');

        // 4.5 - Registrar piezas buenas (si hay)
        if (piezasNum > 0) {
            const insertPiezas = `
                INSERT INTO detalle_produccion (
                    id_ejecucion,
                    cantidad,
                    tipo,
                    fecha
                ) VALUES ($1, $2, 'BUENA', CURRENT_TIMESTAMP)
            `;
            await pool.query(insertPiezas, [id_ejecucion, piezasNum]);
        }

        // 4.6 - Registrar scrap (si hay)
        if (scrapNum > 0) {
            const insertScrap = `
                INSERT INTO detalle_produccion (
                    id_ejecucion,
                    cantidad,
                    tipo,
                    fecha
                ) VALUES ($1, $2, 'SCRAP', CURRENT_TIMESTAMP)
            `;
            await pool.query(insertScrap, [id_ejecucion, scrapNum]);
        }

        // 4.7 - Calcular totales actualizados
        const totalQuery = `
            SELECT 
                COALESCE(SUM(CASE WHEN tipo = 'BUENA' THEN cantidad ELSE 0 END), 0) as total_buenas,
                COALESCE(SUM(CASE WHEN tipo = 'SCRAP' THEN cantidad ELSE 0 END), 0) as total_scrap
            FROM detalle_produccion
            WHERE id_ejecucion = $1
        `;
        const totalResult = await pool.query(totalQuery, [id_ejecucion]);
        const totales = totalResult.rows[0];

        // 4.8 - Confirmar transacción
        await pool.query('COMMIT');

        // 4.9 - Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Producción registrada exitosamente',
            data: {
                piezas_registradas: piezasNum,
                scrap_registrado: scrapNum,
                total_piezas: parseInt(totales.total_buenas),
                total_scrap: parseInt(totales.total_scrap)
            }
        });

    } catch (error) {
        // Rollback en caso de error
        await pool.query('ROLLBACK');
        
        console.error('Error al registrar producción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar la producción',
            error: error.message
        });
    }
};

const pausarEjecucion = async (req, res) => {
    try {
        const { id_ejecucion } = req.body;

        // 5.1 - Validar campo obligatorio
        if (!id_ejecucion) {
            return res.status(400).json({
                success: false,
                message: 'El campo id_ejecucion es obligatorio'
            });
        }

        // 5.2 - Verificar que la ejecución existe y está en proceso
        const checkQuery = `
            SELECT id_ejecucion, estado
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1
        `;
        const checkResult = await pool.query(checkQuery, [id_ejecucion]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ejecución no encontrada'
            });
        }

        const ejecucion = checkResult.rows[0];

        if (ejecucion.estado !== 'EN_PROCESO') {
            return res.status(400).json({
                success: false,
                message: `No se puede pausar una ejecución en estado "${ejecucion.estado}"`
            });
        }

        // 5.3 - Iniciar transacción
        await pool.query('BEGIN');

        // 5.4 - Actualizar estado en ejecucion_proceso
        const updateQuery = `
            UPDATE ejecucion_proceso
            SET estado = 'PAUSADO'
            WHERE id_ejecucion = $1
            RETURNING *
        `;
        const updateResult = await pool.query(updateQuery, [id_ejecucion]);
        const ejecucionActualizada = updateResult.rows[0];

        // 5.5 - Registrar cambio de estado en historial
        const estadoQuery = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha
            ) VALUES ($1, 'PAUSADO', CURRENT_TIMESTAMP)
        `;
        await pool.query(estadoQuery, [id_ejecucion]);

        // 5.6 - Confirmar transacción
        await pool.query('COMMIT');

        // 5.7 - Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Ejecución pausada exitosamente',
            data: {
                id_ejecucion: ejecucionActualizada.id_ejecucion,
                estado: ejecucionActualizada.estado,
                fecha_pausa: new Date().toISOString()
            }
        });

    } catch (error) {
        // Rollback en caso de error
        await pool.query('ROLLBACK');
        
        console.error('Error al pausar ejecución:', error);
        res.status(500).json({
            success: false,
            message: 'Error al pausar la ejecución',
            error: error.message
        });
    }
};

const reanudarEjecucion = async (req, res) => {
    try {
        const { id_ejecucion } = req.body;

        // 6.1 - Validar campo obligatorio
        if (!id_ejecucion) {
            return res.status(400).json({
                success: false,
                message: 'El campo id_ejecucion es obligatorio'
            });
        }

        // 6.2 - Verificar que la ejecución existe y está pausada
        const checkQuery = `
            SELECT id_ejecucion, estado
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1
        `;
        const checkResult = await pool.query(checkQuery, [id_ejecucion]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ejecución no encontrada'
            });
        }

        const ejecucion = checkResult.rows[0];

        if (ejecucion.estado !== 'PAUSADO') {
            return res.status(400).json({
                success: false,
                message: `No se puede reanudar una ejecución en estado "${ejecucion.estado}"`
            });
        }

        // 6.3 - Iniciar transacción
        await pool.query('BEGIN');

        // 6.4 - Actualizar estado en ejecucion_proceso
        const updateQuery = `
            UPDATE ejecucion_proceso
            SET estado = 'EN_PROCESO'
            WHERE id_ejecucion = $1
            RETURNING *
        `;
        const updateResult = await pool.query(updateQuery, [id_ejecucion]);
        const ejecucionActualizada = updateResult.rows[0];

        // 6.5 - Registrar cambio de estado en historial
        const estadoQuery = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha
            ) VALUES ($1, 'EN_PROCESO', CURRENT_TIMESTAMP)
        `;
        await pool.query(estadoQuery, [id_ejecucion]);

        // 6.6 - Confirmar transacción
        await pool.query('COMMIT');

        // 6.7 - Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Ejecución reanudada exitosamente',
            data: {
                id_ejecucion: ejecucionActualizada.id_ejecucion,
                estado: ejecucionActualizada.estado,
                fecha_reanudacion: new Date().toISOString()
            }
        });

    } catch (error) {
        // Rollback en caso de error
        await pool.query('ROLLBACK');
        
        console.error('Error al reanudar ejecución:', error);
        res.status(500).json({
            success: false,
            message: 'Error al reanudar la ejecución',
            error: error.message
        });
    }
};

const terminarEjecucion = async (req, res) => {
    try {
        const { id_ejecucion } = req.body;

        // 7.1 - Validar campo obligatorio
        if (!id_ejecucion) {
            return res.status(400).json({
                success: false,
                message: 'El campo id_ejecucion es obligatorio'
            });
        }

        // 7.2 - Verificar que la ejecución existe
        const checkQuery = `
            SELECT id_ejecucion, estado, fecha_inicio
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1
        `;
        const checkResult = await pool.query(checkQuery, [id_ejecucion]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ejecución no encontrada'
            });
        }

        const ejecucion = checkResult.rows[0];

        if (ejecucion.estado === 'TERMINADO') {
            return res.status(400).json({
                success: false,
                message: 'Esta ejecución ya está terminada'
            });
        }

        // 7.3 - Iniciar transacción
        await pool.query('BEGIN');

        // 7.4 - Actualizar estado y fecha_fin
        const updateQuery = `
            UPDATE ejecucion_proceso
            SET estado = 'TERMINADO',
                fecha_fin = CURRENT_TIMESTAMP
            WHERE id_ejecucion = $1
            RETURNING *
        `;
        const updateResult = await pool.query(updateQuery, [id_ejecucion]);
        const ejecucionActualizada = updateResult.rows[0];

        // 7.5 - Registrar cambio de estado en historial
        const estadoQuery = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha
            ) VALUES ($1, 'TERMINADO', CURRENT_TIMESTAMP)
        `;
        await pool.query(estadoQuery, [id_ejecucion]);

        // 7.6 - Calcular resumen de producción
        const resumenQuery = `
            SELECT 
                COALESCE(SUM(CASE WHEN tipo = 'BUENA' THEN cantidad ELSE 0 END), 0) as total_piezas,
                COALESCE(SUM(CASE WHEN tipo = 'SCRAP' THEN cantidad ELSE 0 END), 0) as total_scrap
            FROM detalle_produccion
            WHERE id_ejecucion = $1
        `;
        const resumenResult = await pool.query(resumenQuery, [id_ejecucion]);
        const resumen = resumenResult.rows[0];

        // 7.7 - Calcular tiempo total (en segundos)
        const fechaInicio = new Date(ejecucion.fecha_inicio);
        const fechaFin = new Date(ejecucionActualizada.fecha_fin);
        const diffSegundos = Math.floor((fechaFin - fechaInicio) / 1000);
        const horas = Math.floor(diffSegundos / 3600);
        const minutos = Math.floor((diffSegundos % 3600) / 60);
        const segundos = diffSegundos % 60;
        const tiempoTotal = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

        // 7.8 - Confirmar transacción
        await pool.query('COMMIT');

        // 7.9 - Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Ejecución terminada exitosamente',
            data: {
                id_ejecucion: ejecucionActualizada.id_ejecucion,
                estado: ejecucionActualizada.estado,
                fecha_fin: ejecucionActualizada.fecha_fin,
                resumen: {
                    total_piezas: parseInt(resumen.total_piezas),
                    total_scrap: parseInt(resumen.total_scrap),
                    tiempo_total: tiempoTotal
                }
            }
        });

    } catch (error) {
        // Rollback en caso de error
        await pool.query('ROLLBACK');
        
        console.error('Error al terminar ejecución:', error);
        res.status(500).json({
            success: false,
            message: 'Error al terminar la ejecución',
            error: error.message
        });
    }
};

const obtenerHistorialEjecucion = async (req, res) => {
    try {
        const { idEjecucion } = req.params;

        // 8.1 - Validar que el ID sea válido
        if (!idEjecucion || isNaN(idEjecucion)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ejecución inválido'
            });
        }

        // 8.2 - Obtener datos de la ejecución
        const ejecucionQuery = `
            SELECT 
                e.id_ejecucion,
                e.id_ordenproduccion,
                e.id_proceso,
                e.id_empleado,
                e.estado,
                e.fecha_inicio,
                e.fecha_fin,
                o.producto as nombre_orden,
                p.nombre_operacion as nombre_proceso,
                emp.nombre as nombre_empleado
            FROM ejecucion_proceso e
            LEFT JOIN orden_produccion o ON e.id_ordenproduccion = o.id_orden
            LEFT JOIN proceso p ON e.id_proceso = p.id_proceso
            LEFT JOIN empleados emp ON e.id_empleado = emp.id_empleado
            WHERE e.id_ejecucion = $1
        `;
        const ejecucionResult = await pool.query(ejecucionQuery, [idEjecucion]);

        if (ejecucionResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ejecución no encontrada'
            });
        }

        const ejecucion = ejecucionResult.rows[0];

        // 8.3 - Obtener historial de estados
        const estadosQuery = `
            SELECT 
                estado,
                fecha
            FROM ejecucion_estado
            WHERE id_ejecucion = $1
            ORDER BY fecha ASC
        `;
        const estadosResult = await pool.query(estadosQuery, [idEjecucion]);

        // 8.4 - Obtener producción (piezas y scrap)
        const produccionQuery = `
            SELECT 
                id_detalle,
                cantidad,
                tipo,
                fecha
            FROM detalle_produccion
            WHERE id_ejecucion = $1
            ORDER BY fecha ASC
        `;
        const produccionResult = await pool.query(produccionQuery, [idEjecucion]);

        // 8.5 - Calcular resumen
        const resumenQuery = `
            SELECT 
                COALESCE(SUM(CASE WHEN tipo = 'BUENA' THEN cantidad ELSE 0 END), 0) as total_piezas,
                COALESCE(SUM(CASE WHEN tipo = 'SCRAP' THEN cantidad ELSE 0 END), 0) as total_scrap,
                COUNT(*) as total_registros
            FROM detalle_produccion
            WHERE id_ejecucion = $1
        `;
        const resumenResult = await pool.query(resumenQuery, [idEjecucion]);
        const resumen = resumenResult.rows[0];

        // 8.6 - Respuesta exitosa
        res.status(200).json({
            success: true,
            data: {
                ejecucion: {
                    id_ejecucion: ejecucion.id_ejecucion,
                    id_ordenproduccion: ejecucion.id_ordenproduccion,
                    id_proceso: ejecucion.id_proceso,
                    id_empleado: ejecucion.id_empleado,
                    estado: ejecucion.estado,
                    fecha_inicio: ejecucion.fecha_inicio,
                    fecha_fin: ejecucion.fecha_fin,
                    nombre_orden: ejecucion.nombre_orden,
                    nombre_proceso: ejecucion.nombre_proceso,
                    nombre_empleado: ejecucion.nombre_empleado
                },
                estados: estadosResult.rows,
                produccion: produccionResult.rows,
                resumen: {
                    total_piezas: parseInt(resumen.total_piezas),
                    total_scrap: parseInt(resumen.total_scrap),
                    total_registros: parseInt(resumen.total_registros)
                }
            }
        });

    } catch (error) {
        console.error('Error al obtener historial de ejecución:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el historial de ejecución',
            error: error.message
        });
    }
};

const obtenerEmpleadosOperador = async (req, res) => {
    try {
        const query = `
            SELECT 
                id_empleado,
                nombre,
                apellido_paterno,
                puesto
            FROM empleados
            WHERE puesto ILIKE '%operador%' OR puesto ILIKE '%operario%'
            ORDER BY nombre ASC
        `;

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay empleados con puesto de operador',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error('Error al obtener empleados operadores:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los empleados',
            error: error.message
        });
        console.error('❌ Error en obtenerEmpleadosOperador:', error);
    }
};


const obtenerHistorialOrden = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                e.id_ejecucion,
                e.id_empleado,
                e.estado as estado_ejecucion,
                e.fecha_inicio,
                e.fecha_fin,
                emp.nombre as nombre_empleado,
                p.nombre_operacion as nombre_proceso,
                dp.cantidad,
                dp.tipo,
                dp.fecha as fecha_produccion
            FROM ejecucion_proceso e
            INNER JOIN proceso p ON e.id_proceso = p.id_proceso
            INNER JOIN empleados emp ON e.id_empleado = emp.id_empleado
            LEFT JOIN detalle_produccion dp ON e.id_ejecucion = dp.id_ejecucion
            WHERE e.id_ordenproduccion = $1
            ORDER BY e.fecha_inicio DESC, dp.fecha ASC
        `;

        const result = await pool.query(query, [id]);

        // Agrupar por ejecución
        const ejecuciones = {};
        result.rows.forEach(row => {
            if (!ejecuciones[row.id_ejecucion]) {
                ejecuciones[row.id_ejecucion] = {
                    id_ejecucion: row.id_ejecucion,
                    nombre_empleado: row.nombre_empleado,
                    nombre_proceso: row.nombre_proceso,
                    estado: row.estado_ejecucion,
                    fecha_inicio: row.fecha_inicio,
                    fecha_fin: row.fecha_fin,
                    produccion: []
                };
            }
            if (row.cantidad !== null) {
                ejecuciones[row.id_ejecucion].produccion.push({
                    cantidad: row.cantidad,
                    tipo: row.tipo,
                    fecha: row.fecha_produccion
                });
            }
        });

        res.status(200).json({
            success: true,
            data: Object.values(ejecuciones)
        });

    } catch (error) {
        console.error('Error al obtener historial de orden:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el historial de la orden',
            error: error.message
        });
    }
};

module.exports ={
    crearOrdenProduccion,
    crearProceso,
    crearOrdenProceso,
    obtenerProcesosOrden,
    obtenerOrdenProduccion,
    obtenerOrdenProduccionid,
    obtenerOrdenesOperador,
    obtenerProcesosDisponibles,
    iniciarEjecucion,
    registrarProduccion,
    pausarEjecucion,
    reanudarEjecucion,
    terminarEjecucion,
    obtenerHistorialEjecucion,
    obtenerEmpleadosOperador,
    obtenerHistorialOrden,
    cambiarEstadoOrden

}