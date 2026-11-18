const productService = require('../services/productServices');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await productService.getLowStock();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const savedProduct = await productService.createNewProduct(req.body);
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateExistingProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (err) {
    const status = err.message === "Prodotto non trovato" ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteExistingProduct(req.params.id);
    res.json({ message: "Prodotto eliminato con successo" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getLowStockProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
