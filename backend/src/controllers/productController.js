const AppError = require('../utils/AppError');
const pool = require('../config/database');

const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const product = result.rows[0];

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      throw new AppError('Nome e preço são obrigatórios.', 400);
    }

    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );

    res.status(201).json({
      message: 'Produto criado com sucesso.',
      product: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || price === undefined) {
      throw new AppError('Nome e preço são obrigatórios para atualização.', 400);
    }

    const existingProduct = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (existingProduct.rows.length === 0) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );

    res.status(200).json({
      message: 'Produto atualizado com sucesso.',
      product: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (existingProduct.rows.length === 0) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const deletedProduct = existingProduct.rows[0];

    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.status(200).json({
      message: 'Produto removido com sucesso.',
      product: deletedProduct
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};