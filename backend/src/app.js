const express = require('express');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API CloudOrders funcionando com sucesso!'
  });
});

app.get('/error-test', (req, res, next) => {
  next(new Error('Erro de teste'));
});

app.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Rota protegida acessada com sucesso.',
    user: req.user
  });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(errorHandler);

module.exports = app;