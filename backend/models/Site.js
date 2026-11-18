const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true // es. "Uffici Centro Varese" o "Furgone"
  },
  address: { 
    type: String, 
    trim: true,
    default: '' 
  },
  active: { 
    type: Boolean, 
    default: true // Per nascondere vecchi cantieri chiusi senza perdere lo storico
  }
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);
