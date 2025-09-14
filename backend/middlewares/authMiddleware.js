const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {message} = require("multer/lib/multer-error");

// Middleware to Protect Routes
const protect = async (req, res, next) => {
    try {
        console.log("Auth middleware: Received headers.authorization:", req.headers.authorization);
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1];
            console.log("Auth middleware: Extracted token:", token ? "present" : "null");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            console.log("Auth middleware: User authenticated:", req.user ? req.user.email : "null");
            next();
        }else {
            console.log("Auth middleware: No token or invalid format");
            res.status(401).json({message: "Not authorized, no token"});
        }
    }catch(err){
        console.log("Auth middleware: Token verification failed:", err.message);
        res.status(401).json({message: "Token failed", error: err.message});
    }
};

// Middleware for Admin Access

const adminAccess = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({message: "Access denied, Administrator"});
    }
};

module.exports = {protect, adminAccess};