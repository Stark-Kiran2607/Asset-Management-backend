const Asset = require('../models/asset');

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find().populate('assignedTo','name email');
        res.json(assets);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const createAsset = async (req, res) => {
    try{
        const { name, type, assignedTo, status, purchaseDate } = req.body;
        if(!name || !type){
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        const asset = new Asset({ name, type, assignedTo, status, purchaseDate });
        await asset.save();
        res.status(201).json(asset);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};
const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!asset){
            return res.status(404).json({message: 'Asset not found'});
        }
        res.json(asset);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }

};
const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if(!asset){
            return res.status(404).json({message: 'Asset not found'});
        }
        res.json({message: 'Asset deleted'});
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

module.exports = { getAssets, createAsset, updateAsset, deleteAsset };
