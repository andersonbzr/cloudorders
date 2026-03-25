const AppError = require('../utils/AppError');

const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('Usuário não autenticado.', 401);
    }

    if (req.user.role !== 'admin') {
      throw new AppError('Acesso negado. Apenas administradores podem realizar esta ação.', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;