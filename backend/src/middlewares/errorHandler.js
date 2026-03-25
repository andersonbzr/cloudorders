const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  console.error(`[ERRO] ${message}`);

  res.status(statusCode).json({
    error: message
  });
};

module.exports = errorHandler;