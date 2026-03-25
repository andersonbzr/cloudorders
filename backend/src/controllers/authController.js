const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const users = require('../data/users');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new AppError('Nome, email e senha são obrigatórios.', 400);
    }

    const userAlreadyExists = users.find((user) => user.email === email);

    if (userAlreadyExists) {
      throw new AppError('Já existe um usuário com esse email.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    };

    users.push(newUser);

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email e senha são obrigatórios.', 400);
    }

    const user = users.find((item) => item.email === email);

    if (!user) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};