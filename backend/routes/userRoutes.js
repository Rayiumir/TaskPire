const express = require("express");
const {protect, adminAccess} = require("../middlewares/authMiddleware");
const router = express.Router();

// User Management Routes

router.get("/", protect, adminAccess, getUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, admins, deleteUser);

module.exports = router;