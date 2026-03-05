const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CareerBoost Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});