const express = require('express');
const router = express.Router();
const {createTransaction, getTransactions} = require('../controllers/transactionController');
const { protect } = require('../middleware/authmiddleware');

router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);
module.exports = router;

