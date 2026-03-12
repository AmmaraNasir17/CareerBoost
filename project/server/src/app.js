const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("CareerBoost Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});