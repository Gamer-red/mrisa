const { pool } = require('../src/config/db');
const fs = require('fs');
const path = require('path');

// Función para mover archivos de temp a la carpeta definitiva
const moverArchivos = (empleadoId, files) => {
    const tempPath = path.join(__dirname, '../../uploads/empleados/temp');
    const finalPath = path.join(__dirname, `../../uploads/empleados/${empleadoId}`);
    
    // Crear la carpeta del empleado si no existe
    if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath, { recursive: true });
    }
    
    const rutasArchivos = {};
    const campos = {
        curp_archivo: 'curp',
        ine: 'ine',
        acta_nacimiento: 'acta_nacimiento',
        rfc_archivo: 'rfc',
        comprobante_domicilio: 'comprobante_domicilio',
        nss_archivo: 'nss'
    };
    
    // Procesar cada campo que tenga archivo
    for (const [campo, nombreArchivo] of Object.entries(campos)) {
        if (files[campo] && files[campo][0]) {
            const archivoTemp = files[campo][0];
            const extension = path.extname(archivoTemp.originalname);
            const nombreFinal = `${nombreArchivo}${extension}`;
            const rutaTemp = archivoTemp.path;
            const rutaFinal = path.join(finalPath, nombreFinal);
            
            // Mover archivo
            fs.renameSync(rutaTemp, rutaFinal);
            
            // Guardar ruta relativa para la base de datos
            rutasArchivos[campo] = `uploads/empleados/${empleadoId}/${nombreFinal}`;
        }
    }
    
    // Limpiar carpeta temporal si quedó vacía
    if (fs.existsSync(tempPath) && fs.readdirSync(tempPath).length === 0) {
        fs.rmdirSync(tempPath);
    }
    
    return rutasArchivos;
};

// Controlador para crear nuevo empleado
const crearEmpleado = async (req, res) => {
    try {
        const files = req.files || {};
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            telefono,
            correo,
            curp,
            rfc,
            nss,
            calle,
            numero,
            colonia,
            codigo_postal,
            estado,
            municipio,
            telefono_emergencia,
            contacto_emergencia,
            puesto,
            departamento,
            turno
        } = req.body;

        // Iniciar transacción
        await pool.query('BEGIN');

        // Insertar empleado en la base de datos
        const query = `
            INSERT INTO empleados (
                nombre,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                telefono,
                correo,
                curp,
                rfc,
                nss,
                calle,
                numero,
                colonia,
                codigo_postal,
                estado,
                municipio,
                telefono_emergencia,
                contacto_emergencia,
                puesto,
                departamento,
                turno
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING id_empleado
        `;

        const values = [
            nombre || null,
            apellido_paterno || null,
            apellido_materno || null,
            fecha_nacimiento || null,
            telefono || null,
            correo || null,
            curp || null,
            rfc || null,
            nss || null,
            calle || null,
            numero || null,
            colonia || null,
            codigo_postal || null,
            estado || null,
            municipio || null,
            telefono_emergencia || null,
            contacto_emergencia || null,
            puesto || null,
            departamento || null,
            turno || null
        ];

        const result = await pool.query(query, values);
        const empleadoId = result.rows[0].id_empleado;

        // Mover archivos a la carpeta definitiva si hay archivos
        let rutasArchivos = {};
        if (Object.keys(files).length > 0) {
            try {
                rutasArchivos = moverArchivos(empleadoId, files);
            } catch (error) {
                console.error('Error al mover archivos:', error);
                // Si falla mover archivos, hacemos rollback
                await pool.query('ROLLBACK');
                return res.status(500).json({
                    success: false,
                    message: 'Error al guardar los archivos del empleado',
                    error: error.message
                });
            }
        }

        // Actualizar la base de datos con las rutas de los archivos
        if (Object.keys(rutasArchivos).length > 0) {
            const updateQuery = `
                UPDATE empleados 
                SET 
                    curp_archivo = $1,
                    ine = $2,
                    acta_nacimiento = $3,
                    rfc_archivo = $4,
                    comprobante_domicilio = $5,
                    nss_archivo = $6
                WHERE id_empleado = $7
            `;
            
            await pool.query(updateQuery, [
                rutasArchivos.curp_archivo || null,
                rutasArchivos.ine || null,
                rutasArchivos.acta_nacimiento || null,
                rutasArchivos.rfc_archivo || null,
                rutasArchivos.comprobante_domicilio || null,
                rutasArchivos.nss_archivo || null,
                empleadoId
            ]);
        }

        // Confirmar transacción
        await pool.query('COMMIT');

        // Obtener el empleado completo para la respuesta
        const empleadoCreado = await pool.query(
            'SELECT * FROM empleados WHERE id_empleado = $1',
            [empleadoId]
        );

        res.status(201).json({
            success: true,
            message: 'Empleado registrado exitosamente',
            data: {
                id_empleado: empleadoId,
                nombre_completo: `${nombre || ''} ${apellido_paterno || ''} ${apellido_materno || ''}`.trim(),
                correo: correo || null,
                departamento: departamento || null,
                puesto: puesto || null,
                archivos: {
                    curp_archivo: rutasArchivos.curp_archivo || null,
                    ine: rutasArchivos.ine || null,
                    acta_nacimiento: rutasArchivos.acta_nacimiento || null,
                    rfc_archivo: rutasArchivos.rfc_archivo || null,
                    comprobante_domicilio: rutasArchivos.comprobante_domicilio || null,
                    nss_archivo: rutasArchivos.nss_archivo || null
                },
                empleado: empleadoCreado.rows[0]
            }
        });

    } catch (error) {
        // Hacer rollback en caso de error
        await pool.query('ROLLBACK');
        console.error('Error al crear empleado:', error);
        
        res.status(500).json({
            success: false,
            message: 'Error al registrar empleado',
            error: error.message
        });
    }
};

// Controlador para obtener todos los empleados (opcional, para la tabla)
const obtenerEmpleados = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                id_empleado,
                nombre,
                Apellido_paterno,
                Apellido_materno,
                correo,
                telefono,
                puesto,
                departamento,
                turno,
                fecha_nacimiento,
                created_at
            FROM empleados 
            ORDER BY id_empleado DESC`
        );

        res.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener empleados',
            error: error.message
        });
    }
};

module.exports = {
    crearEmpleado,
    obtenerEmpleados
};