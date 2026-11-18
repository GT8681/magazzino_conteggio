const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['IN', 'OUT'], // IN = Carico merce, OUT = Scarico verso cantiere
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  site: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Site',
    default: null // Obbligatorio lato logica se type === 'OUT', null se è un carico fornitore
  },
  notes: { 
    type: String, 
    trim: true,
    default: '' // es. "Bolla n. 123" oppure "Intervento straordinario lavaggio fondo"
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Movement', movementSchema);
