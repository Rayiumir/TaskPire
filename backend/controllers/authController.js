const {sign} = require("jsonwebtoken");
const generateToken = (userId) => {
    return sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const loginUser = async (req, res) => {};
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
const getUserProfile = async (req, res) => {};
const updateUserProfile = async (req, res) => {};

module.exports = {loginUser, registerUser, getUserProfile, updateUserProfile};