const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true,
    default: '' // es. Kiter, Kemika, ecc.
  },
  sku: {
    type: String,
    unique: true,
    sparse: true, // Permette di lasciarlo vuoto se non tutti i prodotti hanno un codice
    trim: true
  },
  category: {
    type: String,
    enum: ['Detergenti', 'Attrezzature', 'Dischi e Pad', 'Consumabili', 'DPI', 'Altro'],
    default: 'Detergenti'
  },
  unit: {
    type: String,
    required: true,
    enum: ['pz', 'lt', 'Tanica', 'flacone', 'scatola', 'rotolo'],
    default: 'pz'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  minStock: {
    type: Number,
    required: false,
    default: 2 // Soglia sotto la quale scatta l'avviso "Da riordinare"
  },
  imageUrl: {
    type: String
  }, 
  notes: {
    type: String,
    default: '' // Es. diluizione consigliata o note d'uso
  }
}, { timestamps: true });

// Proprietà virtuale comodissima per il frontend: ci dice subito se è sotto scorta
productSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.minStock;
});

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
