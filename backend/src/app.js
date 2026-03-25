const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./docs/swagger');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API CloudOrders funcionando com sucesso!'
  });
});

app.get('/error-test', (req, res, next) => {
  next(new Error('Erro de teste'));
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/', userRoutes);

app.use(errorHandler);

module.exports = app;