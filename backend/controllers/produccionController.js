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
            producto.trim(),
            cliente.trim(),
            cantidad || null,
            fecha_inicio || null,
            fecha_entrega || null,
            prioridad.trim(),
            numero_plano.trim(),
            lote.trim(),
            material.trim(),
            grado_material.trim(),
            notas.trim()
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

const crearProceso = async (req, res)=> {
    try{
        const {
            nombre_operacion,
            tipo_proceso,
            id_maquina,
            tiempo_estimado,
            notas
        } = req.body;

        const query = `INSERT INTO proceso (nombre_operacion, tipo_proceso,id_maquina, tiempo_estimado, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

        const values = [
            nombre_operacion.trim(),
            tipo_proceso.trim(),
            id_maquina || null,
            tiempo_estimado || null,
            notas ? notas.trim() : null
        ]

        const result = await pool.query(query, values); 
        const nuevoProceso = result.rows[0];

         res.status(201).json({
            success: true,
            message: 'orden creada exitosamente',
            data: nuevoProceso
        });

    }catch(error){
        console.error('Error al crear proceso:', error);

        res.status(500).json({
            message:'Error al crear el proceso',
            error:error.message
        });
    }
}

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

const obtenerProcesos = async (req, res) => {
    try {

        const query = `
            SELECT *
            FROM proceso
            ORDER BY id_proceso ASC
        `;

        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.error('Error al obtener procesos:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los procesos',
            error: error.message
        });
    }
};

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

const iniciarEjecucion = async (req, res) => {
    const client = await pool.connect();

    try {

        const {
            id_ordenproduccion,
            id_proceso,
            id_empleado
        } = req.body;

        if (!id_ordenproduccion) {
            return res.status(400).json({
                success: false,
                message: 'La orden de producción es obligatoria'
            });
        }

        if (!id_proceso) {
            return res.status(400).json({
                success: false,
                message: 'El proceso es obligatorio'
            });
        }

        if (!id_empleado) {
            return res.status(400).json({
                success: false,
                message: 'El operador es obligatorio'
            });
        }

        await client.query('BEGIN');

        const queryEjecucion = `
            INSERT INTO ejecucion_proceso (
                id_ordenproduccion,
                id_proceso,
                id_empleado,
                estado,
                fecha_inicio,
                hora_inicio
            )
            VALUES (
                $1,
                $2,
                $3,
                'EN_PROCESO',
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        const resultEjecucion = await client.query(
            queryEjecucion,
            [
                id_ordenproduccion,
                id_proceso,
                id_empleado
            ]
        );

        const nuevaEjecucion = resultEjecucion.rows[0];

        const queryEstado = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha,
                hora
            )
            VALUES (
                $1,
                'EN_PROCESO',
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        await client.query(
            queryEstado,
            [nuevaEjecucion.id_ejecucion]
        );

        await client.query('COMMIT');

        res.status(201).json({
            success: true,
            message: 'Ejecución iniciada correctamente',
            data: nuevaEjecucion
        });

    } catch (error) {

        await client.query('ROLLBACK');

        console.error('Error al iniciar ejecución:', error);

        res.status(500).json({
            success: false,
            message: 'Error al iniciar la ejecución',
            error: error.message
        });

    } finally {
        client.release();
    }
};

const pausarEjecucion = async (req, res) => {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        await client.query('BEGIN');

        const queryEjecucion = `
            UPDATE ejecucion_proceso
            SET estado = 'PAUSADO'
            WHERE id_ejecucion = $1
              AND estado = 'EN_PROCESO'
            RETURNING *;
        `;

        const resultEjecucion = await client.query(
            queryEjecucion,
            [id]
        );

        if (resultEjecucion.rows.length === 0) {
            await client.query('ROLLBACK');

            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe o no está en proceso'
            });
        }

        const ejecucion = resultEjecucion.rows[0];

        const queryEstado = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha,
                hora
            )
            VALUES (
                $1,
                'PAUSADO',
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        await client.query(
            queryEstado,
            [id]
        );

        await client.query('COMMIT');

        res.status(200).json({
            success: true,
            message: 'Ejecución pausada correctamente',
            data: ejecucion
        });

    } catch (error) {

        await client.query('ROLLBACK');

        console.error('Error al pausar ejecución:', error);

        res.status(500).json({
            success: false,
            message: 'Error al pausar la ejecución',
            error: error.message
        });

    } finally {
        client.release();
    }
};

const reanudarEjecucion = async (req, res) => {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        await client.query('BEGIN');

        const queryEjecucion = `
            UPDATE ejecucion_proceso
            SET estado = 'EN_PROCESO'
            WHERE id_ejecucion = $1
              AND estado = 'PAUSADO'
            RETURNING *;
        `;

        const resultEjecucion = await client.query(
            queryEjecucion,
            [id]
        );

        if (resultEjecucion.rows.length === 0) {
            await client.query('ROLLBACK');

            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe o no está pausada'
            });
        }

        const ejecucion = resultEjecucion.rows[0];

        const queryEstado = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha,
                hora
            )
            VALUES (
                $1,
                'EN_PROCESO',
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        await client.query(
            queryEstado,
            [id]
        );

        await client.query('COMMIT');

        res.status(200).json({
            success: true,
            message: 'Ejecución reanudada correctamente',
            data: ejecucion
        });

    } catch (error) {

        await client.query('ROLLBACK');

        console.error('Error al reanudar ejecución:', error);

        res.status(500).json({
            success: false,
            message: 'Error al reanudar la ejecución',
            error: error.message
        });

    } finally {
        client.release();
    }
};

const terminarEjecucion = async (req, res) => {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        await client.query('BEGIN');

        const queryEjecucion = `
            UPDATE ejecucion_proceso
            SET
                estado = 'TERMINADO',
                fecha_fin = CURRENT_DATE,
                hora_fin = CURRENT_TIME
            WHERE id_ejecucion = $1
              AND estado IN ('EN_PROCESO', 'PAUSADO')
            RETURNING *;
        `;

        const resultEjecucion = await client.query(
            queryEjecucion,
            [id]
        );

        if (resultEjecucion.rows.length === 0) {
            await client.query('ROLLBACK');

            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe o ya está terminada'
            });
        }

        const ejecucion = resultEjecucion.rows[0];

        const queryEstado = `
            INSERT INTO ejecucion_estado (
                id_ejecucion,
                estado,
                fecha,
                hora
            )
            VALUES (
                $1,
                'TERMINADO',
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        await client.query(
            queryEstado,
            [id]
        );

        await client.query('COMMIT');

        res.status(200).json({
            success: true,
            message: 'Ejecución terminada correctamente',
            data: ejecucion
        });

    } catch (error) {

        await client.query('ROLLBACK');

        console.error('Error al terminar ejecución:', error);

        res.status(500).json({
            success: false,
            message: 'Error al terminar la ejecución',
            error: error.message
        });

    } finally {
        client.release();
    }
};

const registrarProduccion = async (req, res) => {
    try {

        const { id } = req.params;
        const { cantidad } = req.body;

        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad es obligatoria'
            });
        }

        if (cantidad < 0) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad no puede ser negativa'
            });
        }

        // Verificar que la ejecución exista y esté en proceso
        const queryEjecucion = `
            SELECT id_ejecucion, estado
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1;
        `;

        const resultEjecucion = await pool.query(
            queryEjecucion,
            [id]
        );

        if (resultEjecucion.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe'
            });
        }

        const ejecucion = resultEjecucion.rows[0];

        if (ejecucion.estado !== 'EN_PROCESO') {
            return res.status(400).json({
                success: false,
                message: 'Solo se puede registrar producción cuando la ejecución está en proceso'
            });
        }

        const query = `
            INSERT INTO produccion (
                id_ejecucion,
                cantidad,
                fecha,
                hora
            )
            VALUES (
                $1,
                $2,
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        const result = await pool.query(
            query,
            [id, cantidad]
        );

        const nuevaProduccion = result.rows[0];

        res.status(201).json({
            success: true,
            message: 'Producción registrada correctamente',
            data: nuevaProduccion
        });

    } catch (error) {

        console.error('Error al registrar producción:', error);

        res.status(500).json({
            success: false,
            message: 'Error al registrar la producción',
            error: error.message
        });
    }
};

const registrarScrap = async (req, res) => {
    try {

        const { id } = req.params;
        const { cantidad, motivo } = req.body;

        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad es obligatoria'
            });
        }

        if (cantidad < 0) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad no puede ser negativa'
            });
        }

        // Verificar que la ejecución exista y esté en proceso
        const queryEjecucion = `
            SELECT id_ejecucion
            FROM ejecucion_proceso
            WHERE id_ejecucion = $1;
        `;

        const resultEjecucion = await pool.query(
            queryEjecucion,
            [id]
        );

        if (resultEjecucion.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe'
            });
        }

        const ejecucion = resultEjecucion.rows[0];

        if (ejecucion.estado !== 'EN_PROCESO') {
            return res.status(400).json({
                success: false,
                message: 'Solo se puede registrar scrap cuando la ejecución está en proceso'
            });
        }

        const query = `
            INSERT INTO scrap (
                id_ejecucion,
                cantidad,
                fecha,
                hora
            )
            VALUES (
                $1,
                $2,
                CURRENT_DATE,
                CURRENT_TIME
            )
            RETURNING *;
        `;

        const result = await pool.query(
            query,
            [id, cantidad, motivo.trim()]
        );

        const nuevoScrap = result.rows[0];

        res.status(201).json({
            success: true,
            message: 'Scrap registrado correctamente',
            data: nuevoScrap
        });

    } catch (error) {

        console.error('Error al registrar scrap:', error);

        res.status(500).json({
            success: false,
            message: 'Error al registrar el scrap',
            error: error.message
        });
    }
};

const obtenerEjecucion = async (req, res) => {
    try {

        const { id } = req.params;

        const query = `
            SELECT
                ep.id_ejecucion,
                ep.id_ordenproduccion,
                ep.id_proceso,
                ep.id_empleado,
                ep.estado,
                ep.fecha_inicio,
                ep.hora_inicio,
                ep.fecha_fin,
                ep.hora_fin,

                CONCAT(e.nombre, ' ', e.apellido_paterno) AS operador,

                p.nombre_operacion,
                p.tipo_proceso,
                p.id_maquina,

                m.nombre AS maquina,

                COALESCE(
                    (
                        SELECT SUM(pr.cantidad)
                        FROM produccion pr
                        WHERE pr.id_ejecucion = ep.id_ejecucion
                    ), 0
                ) AS piezas_producidas,

                COALESCE(
                    (
                        SELECT SUM(s.cantidad)
                        FROM scrap s
                        WHERE s.id_ejecucion = ep.id_ejecucion
                    ), 0
                ) AS piezas_scrap

            FROM ejecucion_proceso ep

            INNER JOIN empleados e
                ON ep.id_empleado = e.id_empleado

            INNER JOIN proceso p
                ON ep.id_proceso = p.id_proceso

            INNER JOIN maquina m
                ON p.id_maquina = m.id_maquina

            WHERE ep.id_ejecucion = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'La ejecución no existe'
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        console.error('Error al obtener ejecución:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener la ejecución',
            error: error.message
        });
    }
};


module.exports ={
    crearOrdenProduccion,
    crearProceso,
    crearOrdenProceso,
    obtenerProcesos,
    obtenerProcesosOrden,
    iniciarEjecucion,
    pausarEjecucion,
    reanudarEjecucion,
    terminarEjecucion,
    registrarProduccion,
    registrarScrap,
    obtenerEjecucion
}