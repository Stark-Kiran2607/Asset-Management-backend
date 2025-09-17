const express = require('express');
const {createTransaction, getTransactions} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);
module.exports = router;

