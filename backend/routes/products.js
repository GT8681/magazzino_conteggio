const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getLowStockProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productControllers');

router.get('/', getProducts);
router.get('/low-stock', getLowStockProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
