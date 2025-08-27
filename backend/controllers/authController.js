const {sign} = require("jsonwebtoken");
const generateToken = (userId) => {
    return sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        // Compare Password
        const isMatch = await  bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid password"});
        }

        // Return User Data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageURL: user.profileImageURL,
            token: generateToken(user._id),
        });

    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageURL, adminInviteToken } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        let role = "user";
        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new User
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            profileImageURL,
            role,
        });

        // Return User Data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageURL: user.profileImageURL,
            token: generateToken(user._id),
        });

    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};
const updateUserProfile = async (req, res) => {};

module.exports = {loginUser, registerUser, getUserProfile, updateUserProfile};