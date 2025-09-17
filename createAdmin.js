const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const createAdmin = async () => {
  const hashedPassword = bcrypt.hashSync("admin2003", 10);

  const admin = new User({
    name: "System Admin",
    email: "admin@asset.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("Admin created!");
  mongoose.disconnect();
};

createAdmin();
