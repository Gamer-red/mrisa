const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== RUTAS ==========
console.log('🔄 Cargando rutas...');

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rutas de empleados (NUEVO)
const empleadosRoutes = require('./routes/empleados/empleadosRoutes');
app.use('/api/empleados', empleadosRoutes);

// ========== RUTAS ADICIONALES (Opcional) ==========
// Si tienes otras rutas como usuarios, puedes agregarlas aquí
// const usuariosRoutes = require('./routes/usuarios');
// app.use('/api/usuarios', usuariosRoutes);

// ========== ENDPOINT DE SALUD ==========
app.get('/api/health', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as time, current_database() as db');
        client.release();
        
        res.json({
            status: 'ok',
            database: 'connected',
            database_name: result.rows[0].db,
            timestamp: result.rows[0].time,
            message: '🚀 Backend funcionando correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error.message
        });
    }
});

// ========== INICIAR SERVIDOR ==========
const startServer = async () => {
    const connected = await testConnection();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📡 Base de datos: ${connected ? '✅ Conectada' : '❌ No conectada'}`);
        console.log('\n📋 Endpoints disponibles:');
        console.log('   🔓 Rutas públicas:');
        console.log('   POST   /api/auth/login - Iniciar sesión');
        console.log('\n   🔒 Rutas protegidas (requieren token):');
        console.log('   GET    /api/auth/verify - Verificar token');
        console.log('   GET    /api/auth/perfil - Obtener perfil');
        console.log('   GET    /api/health - Verificar estado');
        console.log('\n   👥 Rutas de Empleados (solo RH):');
        console.log('   POST   /api/empleados - Crear nuevo empleado');
        console.log('   GET    /api/empleados - Obtener todos los empleados');
    });
};

startServer();