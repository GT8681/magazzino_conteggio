const Product = require('../models/Product');

const getAllProducts = async (queryFilters) => {
  const { category, search } = queryFilters;
  let query = {};

  if (category) query.category = category;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } }
    ];
  }

  return await Product.find(query).sort({ name: 1 });
};

const getLowStock = async () => {
  return await Product.find({
    $expr: { $lte: ["$quantity", "$minStock"] }
  });
};

const createNewProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

const updateExistingProduct = async (id, updateData) => {
  const updated = await Product.findByIdAndUpdate(id, updateData, { 
    new: true, 
    runValidators: true 
  });
  if (!updated) throw new Error("Prodotto non trovato");
  return updated;
};

const deleteExistingProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Prodotto non trovato");
  return deleted;
};

module.exports = {
  getAllProducts,
  getLowStock,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct
};
