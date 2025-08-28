const express = require("express");
const {protect, adminAccess} = require("../middlewares/authMiddleware");
const {getUsers, getUserById} = require("../controllers/userController");
const router = express.Router();

// User Management Routes
router.get("/", protect, adminAccess, getUsers);
router.get("/:id", protect, adminAccess, getUserById);

module.exports = router;