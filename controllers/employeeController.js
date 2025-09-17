const Employee = require('../models/employee');

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);

    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const createEmployee = async (req, res) => {
    try{
        const { name, email, position, department, phone } = req.body;
        if(!name || !email || !position || !department){
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        const existingEmployee = await Employee.findOne({ email });
        if(existingEmployee){
            return res.status(400).json({message: 'Employee with this email already exists'});
        }
        const employee = new Employee({ name, email, position, department, phone });
        await employee.save();
        res.status(201).json(employee);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const updateEmployee = async (req, res) => {
    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!emp){
            return res.status(404).json({message: 'Employee not found'});
        }
        res.json(emp);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const emp = await Employee.findByIdAndDelete(req.params.id);
        if(!emp){
            return res.status(404).json({message: 'Employee not found'});
        }
        res.json({message: 'Employee deleted'});
    }catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };

