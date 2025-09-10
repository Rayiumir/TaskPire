const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getUserProfile, updateUserProfile} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

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

router.put("/updateProfileImage", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.profileImageURL = req.body.profileImageURL || user.profileImageURL;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImageURL: updatedUser.profileImageURL,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

module.exports = router;