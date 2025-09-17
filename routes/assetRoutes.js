const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {getAssets, createAsset, updateAsset, deleteAsset} = require('../controllers/assetController');

router.get('/', authMiddleware, getAssets);
router.post('/', authMiddleware, createAsset);
router.put('/:id', authMiddleware, updateAsset);
router.delete('/:id', authMiddleware, deleteAsset);

module.exports = router;
