require('dotenv').config();

const app = require('./app');
const testConnection = require('./config/testConnection');

const PORT = process.env.PORT || 3000;

testConnection();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});