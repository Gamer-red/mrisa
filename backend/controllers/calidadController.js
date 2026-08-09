const { pool } = require('../src/config/db');

// Controlador para crear una inspección completa
const crearInspeccion = async (req, res) => {
    try {
        const {
            orden_produccion,
            tipo_inspeccion,
            producto,
            operador,
            maquina,
            turno,
            notas,
            tolerancias = [],
            caracteristicas = []
        } = req.body;

        // Iniciar transacción
        await pool.query('BEGIN');

        // 1. Insertar la inspección principal
        const queryInspeccion = `
            INSERT INTO inspeccion (
                orden_produccion,
                tipo_inspeccion,
                producto,
                operador,
                maquina,
                turno,
                notas
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_inspeccion
        `;

        const valuesInspeccion = [
            orden_produccion || null,
            tipo_inspeccion || null,
            producto || null,
            operador || null,
            maquina || null,
            turno || null,
            notas || null
        ];

        const resultInspeccion = await pool.query(queryInspeccion, valuesInspeccion);
        const id_inspeccion = resultInspeccion.rows[0].id_inspeccion;

        // 2. Insertar tolerancias dimensionales
        let toleranciasInsertadas = 0;
        if (tolerancias && tolerancias.length > 0) {
            const queryTolerancia = `
                INSERT INTO tolerancias_dimencionales (
                    id_inspeccion,
                    dimension,
                    minimo,
                    maximo,
                    nominal
                ) VALUES ($1, $2, $3, $4, $5)
            `;

            for (const tol of tolerancias) {
                await pool.query(queryTolerancia, [
                    id_inspeccion,
                    tol.dimension || null,
                    tol.minimo || null,
                    tol.maximo || null,
                    tol.nominal || null
                ]);
                toleranciasInsertadas++;
            }
        }

        // 3. Insertar características críticas
        let caracteristicasInsertadas = 0;
        if (caracteristicas && caracteristicas.length > 0) {
            const queryCaracteristica = `
                INSERT INTO caracteristicas_criticas (
                    id_inspeccion,
                    caracteristica
                ) VALUES ($1, $2)
            `;

            for (const car of caracteristicas) {
                await pool.query(queryCaracteristica, [
                    id_inspeccion,
                    car.caracteristica || null
                ]);
                caracteristicasInsertadas++;
            }
        }

        // Confirmar transacción
        await pool.query('COMMIT');

        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Inspección creada exitosamente',
            data: {
                id_inspeccion,
                orden_produccion: orden_produccion || null,
                tolerancias: toleranciasInsertadas,
                caracteristicas: caracteristicasInsertadas
            }
        });

    } catch (error) {
        // Hacer rollback en caso de error
        await pool.query('ROLLBACK');
        
        res.status(500).json({
            success: false,
            message: 'Error al crear inspección',
            error: error.message
        });
    }
};

// Controlador para obtener todas las inspecciones
const obtenerInspecciones = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                i.*,
                COUNT(DISTINCT t.id_tolerancia) as total_tolerancias,
                COUNT(DISTINCT c.id_caracteristica) as total_caracteristicas
            FROM inspeccion i
            LEFT JOIN tolerancias_dimencionales t ON i.id_inspeccion = t.id_inspeccion
            LEFT JOIN caracteristicas_criticas c ON i.id_inspeccion = c.id_inspeccion
            GROUP BY i.id_inspeccion
            ORDER BY i.id_inspeccion DESC
        `);

        res.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener inspecciones',
            error: error.message
        });
    }
};

// Controlador para obtener una inspección con sus detalles
const obtenerInspeccionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener inspección
        const resultInspeccion = await pool.query(
            'SELECT * FROM inspeccion WHERE id_inspeccion = $1',
            [id]
        );

        if (resultInspeccion.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Inspección no encontrada'
            });
        }

        // Obtener tolerancias
        const resultTolerancias = await pool.query(
            'SELECT * FROM tolerancias_dimencionales WHERE id_inspeccion = $1',
            [id]
        );

        // Obtener características
        const resultCaracteristicas = await pool.query(
            'SELECT * FROM caracteristicas_criticas WHERE id_inspeccion = $1',
            [id]
        );

        res.json({
            success: true,
            data: {
                inspeccion: resultInspeccion.rows[0],
                tolerancias: resultTolerancias.rows,
                caracteristicas: resultCaracteristicas.rows
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener inspección',
            error: error.message
        });
    }
};

module.exports = {
    crearInspeccion,
    obtenerInspecciones,
    obtenerInspeccionPorId
};