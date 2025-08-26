const {sign} = require("jsonwebtoken");
const generateToken = (userId) => {
    return sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const loginUser = async (req, res) => {};
const registerUser = async (req, res) => {};
const getUserProfile = async (req, res) => {};
const updateUserProfile = async (req, res) => {};

module.exports = {loginUser, registerUser, getUserProfile, updateUserProfile};