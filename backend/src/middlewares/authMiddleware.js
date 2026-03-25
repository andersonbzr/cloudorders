const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não informado.', 401);
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new AppError('Token mal formatado.', 401);
    }

    const [scheme, token] = parts;

    if (scheme !== 'Bearer') {
      throw new AppError('Token mal formatado.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;