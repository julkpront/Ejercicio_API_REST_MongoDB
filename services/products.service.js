const Product = require('../models/products.model');

const getAllProducts = async () => {
  const products = await Product.find().populate('provider');
  return products;
};

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

const updateProduct = async (data) => {
  const { title, price, description, provider } = data;

  const product = await Product.findOneAndUpdate(
    { title: title },
    { price, description, provider },
    { new: true, runValidators: true }
  ).populate('provider');

  return product;
};

const deleteProduct = async (title) => {
  const product = await Product.findOneAndDelete({ title: title });
  return product;
};

const countProductsByProvider = async (providerId) => {
  const total = await Product.countDocuments({ provider: providerId });
  return total;
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  countProductsByProvider
};