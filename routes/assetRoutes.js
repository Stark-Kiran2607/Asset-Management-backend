const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authmiddleware');
const {getAssets, createAsset, updateAsset, deleteAsset} = require('../controllers/assetController');

router.get('/', protect, getAssets);
router.post('/', protect, admin, createAsset);
router.put('/:id', protect, admin, updateAsset);
router.delete('/:id', protect, admin, deleteAsset);

module.exports = router;
