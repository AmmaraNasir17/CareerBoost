const {
  createJob,
  getAllJobs,
  getJobByUserId,
  getJobById,
  removeJob,
} = require("../models/job.model");

// Recruiter → create job
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      created_by: req.user.id,
    };

    const job = await createJob(jobData);

    res.json({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// Recruiter → delete job
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await getJobById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.created_by !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await removeJob(job.id);
    res.json({
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// Recruiter → get own jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await getJobByUserId(req.user.id);
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// Public → get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// Public → get single job
exports.getJob = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
