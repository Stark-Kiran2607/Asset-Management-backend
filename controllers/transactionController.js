const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const Employee = require('../models/employee');

const createTransaction = async (req, res) => {
    try {
        const { asset, employee, action, issueDate, returnDate } = req.body;

        if (! asset || ! employee || ! action) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const foundAsset = await Asset.findById(asset);
        if (! foundAsset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const foundEmployee = await Employee.findById(employee);
        if (! foundEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const transactions = await Transaction({asset, employee, action, issueDate, returnDate, createBy: req.user?.id || null});
        await transactions.save();

        res.status(201).json({message: 'Transactionn created successfully', transactions});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        .populate('asset', "name category")
        .populate("employee", "name email")
        .populate("createBy", "name email role");
        res.json(transactions);
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});

    }
};

module.exports = { createTransaction, getTransactions };

