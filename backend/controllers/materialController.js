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
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Ya existe un material con ese nombre',
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

const obtenerMateriales = async (req, res) => {
    try{
        const query = `SELECT id_material, codigo_interno, nombre, tipo, categoria, stock, unidad from material ORDER BY id_material`

        const result = await pool.query(query);
        const material = result.rows;

        res.status(200).json({
            success: true,
            count: material.length,
            data:material
        })

    }catch(error){
        console.error('Error al obteer los materiales',error);

        res.status(500).json({
            success: false,
            message:'Error al obtener los materuales',
            error: error.message
        })
    }

}

const obtenerMaterialPorId = async (req, res) => {

    try{

        const { id } = req.params;

         const query = `SELECT id_material, codigo_interno, nombre, tipo, categoria, stock, unidad from material WHERE id_material = $1`;

        const result = await pool.query(query,[id]);
        const material = result.rows[0];

        if(!material){
            return res.status(404).json({
                success:false,
                message:`no se encontro la maquina con el ID: ${id}`
            });
        }
        res.status(200).json({
            success:true,
            data:material
        })

    }catch(error){
        console.error('Error al obtener materia; por ID', error);

        res.status(500).json({
            success:false,
            message:'Error al obtener material',
            error:error.message
        });
    }

}

const eliminarMaterialPorid = async (req, res) => {
    try{
        const { id } = req.params;

        const query = `DELETE FROM material WHERE id_material = $1`;
        const result = await pool.query(query,[id]);
        const material = result.rows[0];

        res.status(200).json({
            success:true,
            data:material
        })

    }catch(error){
        console.error('Error al eliminar material por ID', error);

        res.status(500).json({
            success:false,
            message:'Error al obtener material',
            error:error.message
        });

    }
}

const materialActualizado = async (req, res) => {
        try{
        const { id } = req.params;
        const{
            codigo_interno,
            nombre,
            tipo,
            categoria,
            stock,
            unidad
        } = req.body;

        if(isNaN(id) || id<= 0){
            return res.status(400).json({
                success: false,
                message:'El id debe ser mayor a 0'
            });
        }

        const query = 'UPDATE material SET codigo_interno = $1, nombre = $2, tipo = $3, categoria = $4, stock = $5, unidad = $6 WHERE id_material = $7 RETURNING id_material, codigo_interno, nombre, tipo, categoria, stock, unidad';

        const values = [
            codigo_interno.trim(),
            nombre.trim(),
            tipo.trim(),
            categoria.trim(),
            stock || null,
            unidad.trim(),
            id
        ];

        const result = await pool.query(query,values);
        const materialActualizado = result.rows[0];

        if(!materialActualizado){
            return res.status(404).json({
                success: false,
                message:`no se encontro un material con el ID ${id}`
            });
        }

        res.status(200).json({
            success:true,
            message: 'materual actualizado correctamente',
            data: materialActualizado
        });

    }catch(error){
        console.error('Error al actualizar el material:',error);
        res.status(500).json({
            success:false,
            message: 'Errro al actualizar el material',
            error: error.message
        });
    }
}

module.exports = {
    crearMaterial,
    obtenerMateriales,
    obtenerMaterialPorId,
    eliminarMaterialPorid,
    materialActualizado
}

