const { pool } = require('../src/config/db');
/**
 * Crear una nueva máquina
 * POST /api/maquinas
 */
const crearMaquina = async (req, res) => {

    try {
        const { nombre, tipo, estado_operativo, notas } = req.body;

        // Query para insertar la máquina
        const query = `
            INSERT INTO maquina (
                nombre,
                tipo,
                estado_operativo,
                notas
            ) VALUES ($1, $2, $3, $4)
            RETURNING id_maquina, nombre, tipo, estado_operativo, notas
        `;

        const values = [
            nombre.trim(),
            tipo.trim(),
            estado_operativo ? estado_operativo.trim() : null,
            notas ? notas.trim() : null
        ];

        const result = await pool.query(query, values);
        const nuevaMaquina = result.rows[0];

        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Máquina creada exitosamente',
            data: nuevaMaquina
        });

    } catch (error) {
        console.error('Error al crear máquina:', error);

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
            message: 'Error al crear la máquina',
            error: error.message
        });
    }
};

const obtenerMaquina = async (req,res) => {
    try{
        const query = `SELECT id_maquina, nombre, tipo, estado_operativo, notas FROM maquina ORDER BY id_maquina DESC`;
        const result = await pool.query(query);
        const maquinas = result.rows;

        res.status(200).json({
            success: true,
            count: maquinas.length,
            data:maquinas
        })
    }catch (error){
        console.error('Error al obteer las maquinas',error);

        res.status(500).json({
            success: false,
            message:'Error al obtener las maquinas',
            error: error.message
        })
    }
}

const obteberNaquinaPorId = async (req, res) =>{
    try{
        const { id } = req.params;

        if(isNaN(id) || id<= 0){
            return res.status(400).json({
                success:false,
                message: 'El ID sebe ser un numero valido mayor a 0'
            })
        }

        const query = `SELECT id_maquina, nombre, tipo, estado_operativo, notas FROM maquina WHERE id_maquina = $1`;
        
        const result = await pool.query(query,[id]);
        const maquina = result.rows[0];

        if(!maquina){
            return res.status(404).json({
                success:false,
                message:`no se encontro la maquina con el ID: ${id}`
            });
        }

        res.status(200).json({
            success:true,
            data:maquina
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

const maquinaActualizada = async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre, tipo, estado_operativo, notas} = req.body;

        if(isNaN(id) || id<= 0){
            return res.status(400).json({
                success: false,
                message:'El id debe ser mayor a 0'
            });
        }

        const query = 'UPDATE maquina SET nombre = $1, tipo = $2, estado_operativo = $3, notas = $4 WHERE id_maquina = $5 RETURNING id_maquina, nombre, tipo, estado_operativo, notas';

        const values = [
            nombre.trim(),
            tipo.trim(),
            estado_operativo ? estado_operativo.trim() : null, notas ? notas.trim() : null,
            id
        ];

        const result = await pool.query(query,values);
        const maquinaActualizada = result.rows[0];

        if(!maquinaActualizada){
            return res.status(404).json({
                success: false,
                message:`no se encontro una maquina con el ID ${id}`
            });
        }

        res.status(200).json({
            success:true,
            message: 'Maquina actualizada correctamente',
            data: maquinaActualizada
        });

    }catch(error){
        console.error('Error al actualizar la maquina:',error);

        if(error.code === '23505'){
            return res.status(409).json({
                success: false,
                message:'Ya existe una maquina con ese nombre',
                error:error.detail
            });
        }

        res.status(500).json({
            success:false,
            message: 'Errro al actualizar la maquina',
            error: error.message
        });
    }
};

const eliminarMaquinaPorId= async (req, res) => {
    try{
        const { id } = req.params;

        const query = `DELETE FROM maquina WHERE id_maquina = $1`;
        const result = await pool.query(query,[id]);
        const maquina = result.rows[0];

        res.status(200).json({
            success:true,
            data:maquina
        })

    }catch(error){
        console.error('Error al eliminar la maquina por ID', error);

        res.status(500).json({
            success:false,
            message:'Error al obtener la maquina',
            error:error.message
        });

    }
}

// ============ EXPORTAR TODAS LAS FUNCIONES ============
module.exports = {
    crearMaquina,
    obtenerMaquina,
    obteberNaquinaPorId,
    maquinaActualizada,
    eliminarMaquinaPorId
};