const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getUserProfile, updateUserProfile} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/uploadImage", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Not File Uploaded");
    }
    const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({imageURL});
});

module.exports = router;