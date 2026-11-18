const movementService = require('../services/movementService');

const getMovements = async (req, res) => {
  try {
    const movements = await movementService.getAllMovements();
    res.json(movements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Nel controller / rotta POST
const createMovementController = async (req, res) => {
  try {
    // Passa direttamente tutto req.body alla funzione del service
    const movement = await movementService.registerMovement(req.body);
    res.status(201).json(movement);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
  getMovements,
  createMovementController
};
