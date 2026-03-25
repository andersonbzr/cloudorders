const pool = require('./database');

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Banco conectado com sucesso.');
    console.log('Horário do banco:', result.rows[0].now);
  } catch (error) {
    console.error('Erro ao conectar no banco:', error.message);
  }
};

module.exports = testConnection;