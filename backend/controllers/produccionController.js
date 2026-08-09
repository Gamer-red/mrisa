const { pool } = require('../src/config/db');

const crearOrdenProduccion = async (req, res) => {

    try{
        const{
            id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, numero_plano, lote, material, grado_material, notas
        } = req.body

        const query = `INSERT INTO orden_produccion  (id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, Numero_plano, lote, material, grado_material, notas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_material, producto, cliente, cantidad, fecha_inicio, fecha_entrega, prioridad, Numero_plano, lote, material, grado_material,notas`;

        const values = [
            id_material || null, producto.trim(),
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

module.exports ={
    crearOrdenProduccion
}