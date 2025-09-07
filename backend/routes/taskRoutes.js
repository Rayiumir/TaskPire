const express = require('express');
const {protect, adminAccess} = require("../middlewares/authMiddleware");
const {
    getDashboardData,
    getUserData,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist
} = require("../controllers/taskController");
const router = express.Router();

// Task Management Routes

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-data", protect, getUserData);

router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);

router.post("/", protect, adminAccess, createTask);
router.put("/:id", protect, adminAccess, updateTask);
router.delete("/:id", protect, adminAccess, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/tode", protect, updateTaskChecklist);

module.exports = router;