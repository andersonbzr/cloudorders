const AppError = require('../utils/AppError');

let products = [
  {
    id: 1,
    name: 'Notebook',
    price: 3500
  },
  {
    id: 2,
    name: 'Mouse',
    price: 120
  }
];

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;

    const product = products.find((item) => item.id === Number(id));

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      throw new AppError('Nome e preço são obrigatórios.', 400);
    }

    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      price
    };

    products.push(newProduct);

    res.status(201).json({
      message: 'Produto criado com sucesso.',
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex((item) => item.id === Number(id));

    if (productIndex === -1) {
      throw new AppError('Produto não encontrado.', 404);
    }

    if (!name || price === undefined) {
      throw new AppError('Nome e preço são obrigatórios para atualização.', 400);
    }

    products[productIndex] = {
      ...products[productIndex],
      name,
      price
    };

    res.status(200).json({
      message: 'Produto atualizado com sucesso.',
      product: products[productIndex]
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const { id } = req.params;

    const productIndex = products.findIndex((item) => item.id === Number(id));

    if (productIndex === -1) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const deletedProduct = products[productIndex];

    products.splice(productIndex, 1);

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