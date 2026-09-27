const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, testConnection } = require('./config/db');
const maquinasRoutes = require('../src/routes/maquinas/maquinas');
const mantenimientoRoutes = require('../src/routes/mantenimiento/mantenimiento')
const empleadosRoutes = require('./routes/empleados/empleadosRoutes');
const materialRoutes = require ('../src/routes/material/material')
const calidadRoutes = require('./routes/calidad/calidadRoutes');
const produccionRoutes = require ('../src/routes/produccion/produccion')


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
//const authRoutes = require('./routes/auth');
//app.use('/api/auth', authRoutes);

// Rutas de empleados (NUEVO)
app.use('/api/rh', empleadosRoutes);

app.use('/api/calidad', calidadRoutes);

app.use('/api/maquinas', maquinasRoutes);

app.use('/api/material', materialRoutes);

app.use('/api/mantenimiento',mantenimientoRoutes)

app.use('/api/produccion',produccionRoutes)

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
    });
};

startServer();