const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authmiddleware");


router.get("/", protect, admin, getUsers);


router.get("/:id", protect, getUserById);


router.put("/:id", protect, admin, updateUser);


router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
