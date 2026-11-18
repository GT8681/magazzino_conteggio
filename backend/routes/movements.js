const express = require('express');
const router = express.Router();
const { 
  getMovements, 
  createMovementController 
} = require('../controllers/movementController');

router.get('/', getMovements);
router.post('/', createMovementController);

module.exports = router;
