const { pool } = require('../src/config/db');

const crearMantenimiento = async (req, res) =>{
    try{
        const{id_maquina, tipo, frecuencia, descripcion, fecha,costo, notas} = req.body;

        const query = `INSERT INTO mantenimiento (
                id_maquina,
                tipo,
                frecuencia,
                descripcion,
                fecha,
                costo,
                notas
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_mantenimiento `;

        const values = [
            id_maquina,
            tipo.trim(),
            frecuencia.trim(),
            descripcion ? descripcion.trim() : null,
            fecha,
            costo || null,
            notas ? notas.trim() : null 
        ]

        const result = await pool.query(query,values);
        const id_mantenimiento = result.rows[0];

        const updateQuery = `
            UPDATE maquina 
            SET estado_operativo = 'EN_MANTENIMIENTO'
            WHERE id_maquina = $1
        `;
        await pool.query(updateQuery, [id_maquina]);

        // 4. Confirmar transacción
        await pool.query('COMMIT');

        res.status(201).json({
            success: true,
            message: 'Mantenimiento creado correctamente',
            data: {id_mantenimiento}
        });
    }catch(error){
        console.error('error al crear el mantemiento', error);
        res.status(500).json({
            success:false,
            message:'error al crear el mantenimiento',
            error: error.message
        });
    }
}

const mantenimientoLista = async (req, res) =>{
    try{
        const query = `SELECT id_mantenimiento, id_maquina, tipo, frecuencia, descripcion, fecha, costo, notas FROM mantenimiento ORDER BY id_mantenimiento DESC`;
        const result = await pool.query(query);
        const mantenimiento = result.rows;

        res.status(200).json({
            success:true,
            count: mantenimiento.length,
            data:mantenimiento
        })
    }catch(error){
        console.error('Error al obtener las maquinas',error);
    }
}

module.exports = {
    crearMantenimiento,
    mantenimientoLista
}