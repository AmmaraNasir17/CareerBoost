const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");
const profileRoutes = require("./routes/profile.routes");
const savedJobRoutes = require("./routes/savedJob.routes");
const resumeRoutes = require("./routes/resume.routes");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("CareerBoost Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});