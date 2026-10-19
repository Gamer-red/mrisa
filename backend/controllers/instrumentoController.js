const { pool } = require('../src/config/db');

const crearInstrumento = async (req, res) =>{
    try{   
        const {codigo_interno,nombre_descriptivo,tipo_instrumento, ubicacion, marca, modelo, numero_serie, estado, rango_medicion,resolucion, exactitud, notas} = req.body;

        const query = `INSERT INTO instrumento (codigo_interno,nombre_descriptivo,tipo_instrumento, ubicacion, marca, modelo, numero_serie, estado, rango_medicion,resolucion, exactitud, notas) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id_instrumento`;

        const values = [
            codigo_interno.trim(),
            nombre_descriptivo.trim(),
            tipo_instrumento.trim(),
            ubicacion.trim(),
            marca.trim(),
            modelo.trim(),
            numero_serie.trim(),
            estado.trim(),
            rango_medicion,
            resolucion,
            exactitud,
            notas ? notas.trim() : null
        ]

        const result = await pool.query(query,values);
        const id_instrumento = result.rows[0];

        res.status(201).json({
            success: true,
            messahe:'Instrumento creado correctamente',
            data: {id_instrumento}
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ 
            success:false,
            message:'Error al crear el instrumento',
            error:error.message
        });
    }
}

module.exports = {
    crearInstrumento
}