const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB (Docker)
mongoose.connect("mongodb://mongo:27017/messages");

const Msg = mongoose.model("Msg", { text: String });

// add message
app.post("/add", async (req, res) => {
  await new Msg({ text: req.body.text }).save();
  res.send("Added");
});

// get all messages
app.get("/all", async (req, res) => {
  res.json(await Msg.find());
});

app.listen(5000, () => console.log("Server running on 5000"));