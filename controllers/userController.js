const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {name, role} = req.body;
        const user = await User.findByIdAndUpdate(req.params.id);

        if (!user) return res.status(404).json({message:"User not found"});
        if(name) user.name = name;
        if(role) user.role = role;
        await user.save();
        res.json({message: 'User updated successfully', user});
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});

    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted successfully'});
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};
module.exports = { getUsers, getUserById, updateUser, deleteUser };
