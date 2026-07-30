const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    // Definir dónde se guardarán los archivos
    destination: function (req, file, cb) {
        // Crear carpeta temporal para archivos
        const uploadPath = path.join(__dirname, '../../uploads/empleados/temp');
        
        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    
    // Definir el nombre del archivo
    filename: function (req, file, cb) {
        // Generar nombre único con timestamp y uuid
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        
        // Formato: nombre_original_timestamp.ext
        cb(null, `${name}_${uniqueSuffix}${ext}`);
    }
});

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Permitir solo PDF y PNG
    const allowedTypes = ['application/pdf', 'image/png'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan PDF y PNG'), false);
    }
};

// Configuración de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Límite de 10MB por archivo
    }
});

// Middleware para manejar múltiples archivos
// Definimos los campos que vamos a recibir
const uploadFields = upload.fields([
    { name: 'curp_archivo', maxCount: 1 },
    { name: 'ine', maxCount: 1 },
    { name: 'acta_nacimiento', maxCount: 1 },
    { name: 'rfc_archivo', maxCount: 1 },
    { name: 'comprobante_domicilio', maxCount: 1 },
    { name: 'nss_archivo', maxCount: 1 }
]);

// Middleware de manejo de errores de Multer
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Errores específicos de Multer
        if (err.code === 'FILE_TOO_LARGE') {
            return res.status(400).json({
                success: false,
                message: 'El archivo es demasiado grande. Máximo 10MB'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'Número de archivos no permitido'
            });
        }
        return res.status(400).json({
            success: false,
            message: `Error al subir archivo: ${err.message}`
        });
    }
    
    if (err) {
        // Otros errores
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
    next();
};

module.exports = {
    uploadFields,
    handleUploadError
};