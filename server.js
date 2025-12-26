const reviewRoutes = require("./routes/reviewRoutes");


require("dotenv").config();
console.log("MONGO_URI VALUE =", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/reviews", reviewRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.get("/", (req, res) => {
  res.send("AEORRA Review Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
