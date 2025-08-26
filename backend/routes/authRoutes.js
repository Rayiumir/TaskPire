const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getUserProfile, updateUserProfile} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;