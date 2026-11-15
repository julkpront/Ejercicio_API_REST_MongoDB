const productService = require('../services/products.service');
const providerService = require('../services/providers.service');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, description, provider } = req.body;

    if (!title || price === undefined || !provider) {
      return res.status(400).json({ message: 'Faltan datos: title, price y provider son obligatorios' });
    }

    const providerFound = await providerService.getProviderByName(provider);

    if (!providerFound) {
      return res.status(404).json({ message: `No existe ningún proveedor con el nombre '${provider}'` });
    }

    const product = await productService.createProduct({
      title,
      price,
      description,
      provider: providerFound._id
    });

    res.status(201).json({ message: 'producto creado', product });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ya existe un producto con ese título' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, price, description, provider } = req.body;

    if (!title || price === undefined || !provider) {
      return res.status(400).json({ message: 'Faltan datos: title, price y provider son obligatorios' });
    }

    const providerFound = await providerService.getProviderByName(provider);

    if (!providerFound) {
      return res.status(404).json({ message: `No existe ningún proveedor con el nombre '${provider}'` });
    }

    const product = await productService.updateProduct({
      title,
      price,
      description,
      provider: providerFound._id
    });

    if (!product) {
      return res.status(404).json({ message: `No existe ningún producto con el título '${title}'` });
    }

    res.status(200).json({ message: `producto actualizado: ${title}`, product });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Falta el título del producto a borrar' });
    }

    const product = await productService.deleteProduct(title);

    if (!product) {
      return res.status(404).json({ message: `No existe ningún producto con el título '${title}'` });
    }

    res.status(200).json({ message: `Se ha borrado el producto: ${title}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};