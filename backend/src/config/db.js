const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE,
  ssl: false,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
    console.log(`📊 Base de datos: ${process.env.DB_DATABASE}`);
    console.log(`🔗 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:');
    console.error(`📝 Detalle: ${error.message}`);
    if (error.code) {
      console.error(`🔢 Código de error: ${error.code}`);
    }
    return false;
  }
};

module.exports  = { pool, testConnection };