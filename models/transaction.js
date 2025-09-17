const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    action: { type: String, enum: ['issue', 'return'], required: true },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);