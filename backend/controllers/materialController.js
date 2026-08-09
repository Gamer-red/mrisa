const { pool } = require('../src/config/db');

const crearMaterial = async (req , res)=>{
    try{
        const{
            codigo_interno,
            nombre,
            tipo,
            categoria,
            stock,
            unidad
        } = req.body;

        const query = `INSERT INTO material (codigo_interno, nombre, tipo, categoria, stock, unidad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_material, codigo_interno, nombre, tipo, categoria, stock, unidad`;

        const values = [
            codigo_interno.trim(),
            nombre.trim(),
            tipo.trim(),
            categoria.trim(),
            stock || null, 
            unidad.trim()
        ]
        const result = await pool.query(query,values);
        const nuevoMaterial = result.rows[0];

        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'materual creado exitosamente',
            data: nuevoMaterial
        });
    }catch (error) {
        console.error('Error al crear materual:', error);

        // Manejar errores específicos de PostgreSQL
        if (error.code === '23505') { // Violación de unique constraint
            return res.status(409).json({
                success: false,
                message: 'Ya existe una máquina con ese nombre',
                error: error.detail
            });
        }
        // Error genérico
        res.status(500).json({
            success: false,
            message: 'Error al crear la materia;',
            error: error.message
        });
    }
}

module.exports = {
    crearMaterial
}

