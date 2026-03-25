const express = require('express');

const productRoutes = require('./routes/productRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API CloudOrders funcionando com sucesso!'
  });
});

app.use('/products', productRoutes);

app.use(errorHandler);

module.exports = app;