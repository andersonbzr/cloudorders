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

const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return res.status(404).json({
      message: 'Produto não encontrado.'
    });
  }

  res.status(200).json(product);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      message: 'Nome e preço são obrigatórios.'
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json({
    message: 'Produto criado com sucesso.',
    product: newProduct
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};