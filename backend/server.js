const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione a MongoDB Atlas (o locale)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('📦 Connesso a MongoDB con successo!'))
  .catch((err) => console.error('Errore di connessione a MongoDB:', err));

// Rotte API
app.use('/api/products', require('./routes/products'));
app.use('/api/movements', require('./routes/movements'));

// Rotta di test base
app.get('/', (req, res) => {
  res.send('API Magazzino Bolnet attiva e funzionante 🚀');
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
