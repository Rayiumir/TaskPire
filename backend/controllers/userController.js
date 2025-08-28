const User = require("../models/User");
const Task = require("../models/Task");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({role:'user'}).select("-password");

        // Add Task counts to user
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pending = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgress = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completed = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc,
                pending,
                inProgress,
                completed,
            };
        }));

        res.json(usersWithTaskCounts);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { getUsers, getUserById };