const express = require('express');
const {protect, adminAccess} = require("../middlewares/authMiddleware");
const {exportTasksReport, exportUsersReport} = require("../controllers/reportController");
const router = express.Router();

router.get("/export/tasks", protect, adminAccess, exportTasksReport);
router.get("/export/users", protect, adminAccess, exportUsersReport);

module.exports = router;