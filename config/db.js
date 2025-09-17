const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

    }catch(err){
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected database name:', db.name);
    console.log('Collections:', Object.keys(db.collections));
});


module.exports = connectDB;