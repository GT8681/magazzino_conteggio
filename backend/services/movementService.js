const Movement = require('../models/Movement');
const Product = require('../models/Product');
require('../models/Site'); 


const getAllMovements = async () => {
  return await Movement.find()
    .populate('product', 'name brand unit')
    .sort({ date: -1 })
    .limit(100);
};

const registerMovement = async (movementData) => {
  const { productId, type, quantity, site, notes, date } = movementData;

  const productDoc = await Product.findById(productId);
  if (!productDoc) {
    throw new Error("Prodotto non trovato nel magazzino");
  }

  let qtyChange = Number(quantity);

  if (type === 'OUT') {
    if (productDoc.quantity < qtyChange) {
      throw new Error(`Giacenza insufficiente per "${productDoc.name}". Disponibili: ${productDoc.quantity} ${productDoc.unit}`);
    }
    qtyChange = -qtyChange;
  }

  const newMovement = new Movement({
    product: productId, 
    type,
    quantity: Number(quantity),
    site: site || null,
    notes,
    date: date || Date.now()
  });

  const savedMovement = await newMovement.save();

  // Aggiorna giacenza prodotto
  productDoc.quantity += qtyChange;
  await productDoc.save();

  return await Movement.findById(savedMovement._id)
    .populate('product', 'name brand unit quantity')
    .populate('site', 'name');
};


module.exports = {
  getAllMovements,
  registerMovement
};
