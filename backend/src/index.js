const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, testConnection } = require('../src/config/db');

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

try {
    const authRoutes = require('../src/routes/auth');
    console.log('✅ Auth routes cargadas:', typeof authRoutes);
    app.use('/api/auth', authRoutes);
} catch (error) {
    console.error('❌ Error cargando auth routes:', error.message);
}

/*try {
    const usuariosRoutes = require('../src/routes/usuarios');
    console.log('✅ Usuarios routes cargadas:', typeof usuariosRoutes);
    app.use('/api/usuarios', usuariosRoutes);
} catch (error) {
    console.error('❌ Error cargando usuarios routes:', error.message);
}*/

// Endpoint de salud
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

// Iniciar servidor
const startServer = async () => {
    const connected = await testConnection();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📡 Base de datos: ${connected ? '✅ Conectada' : '❌ No conectada'}`);
    });
};

startServer();