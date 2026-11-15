const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;