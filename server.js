const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes =  require("./routes/authRoutes");
const userRoutes =  require("./routes/userRoutes");
const assetRoutes =  require("./routes/assetRoutes");
const employeeRoutes =  require("./routes/employeeRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Default route
app.get("/", (req, res) => {
  res.send("Asset Management API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/transactions", transactionRoutes);


// Error handling middleware (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
