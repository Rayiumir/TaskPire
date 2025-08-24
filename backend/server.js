require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {connect} = require("mongoose");
const connectDB = require("./config/db");
const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect Database

connectDB();

// Middleware
app.use(express.json());

// Routes

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/reports", reportRoutes);


// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));