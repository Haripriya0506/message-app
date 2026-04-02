const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔁 MongoDB Connection with Retry
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongo:27017/messagesDB");
        console.log("MongoDB connected");
    } catch (err) {
        console.log("MongoDB not ready, retrying in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// 📦 Schema & Model
const messageSchema = new mongoose.Schema({
    text: String
});

const Message = mongoose.model("Message", messageSchema);

// ➕ ADD MESSAGE
app.post("/add", async (req, res) => {
    try {
        const newMsg = new Message({
            text: req.body.text
        });

        await newMsg.save();

        res.json({
            success: true,
            message: "Message added successfully"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📄 GET ALL MESSAGES (WITH YOUR INTRO)
app.get("/all", async (req, res) => {
    try {
        const data = await Message.find();

        res.json({
            student: "Haripriya",
            course: "CS515 - Unix Programming",
            project: "Multi-tier Message App using Docker & Kubernetes",
            success: true,
            messages: data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});