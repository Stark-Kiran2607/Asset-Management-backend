const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: { type: String, enum: ['available', 'assigned', 'maintenance'], default: 'available' },
    purchaseDate: { type: Date },
}, { timestamps: true });
module.exports = mongoose.model('Asset', assetSchema);