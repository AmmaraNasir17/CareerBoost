const { createHttpError } = require("../../utils/appError");
const {
  createJob,
  findAllJobs,
  findJobById,
  findJobsByRecruiterId,
  updateJob,
  deleteJob,
} = require("../../models/job.model");

exports.getAllJobs = async (req, res) => {
  try {
    const filters = {
      location: req.query.location,
      salary_min: req.query.salary_min ? parseInt(req.query.salary_min) : null,
      salary_max: req.query.salary_max ? parseInt(req.query.salary_max) : null,
      job_type: req.query.job_type,
      experience_level: req.query.experience_level,
      search: req.query.search,
    };

    const jobs = await findAllJobs(filters);
    res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);

    res.json({ job });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await findJobsByRecruiterId(req.user.id);
    res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.postJob = async (req, res) => {
  try {
    const job = await createJob(req.user.id, req.body);
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.editJob = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);
    if (job.recruiter_id !== req.user.id) throw createHttpError("Unauthorized", 403);

    const updated = await updateJob(req.params.id, req.user.id, req.body);
    res.json({ message: "Job updated successfully", job: updated });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeJob = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);
    if (job.recruiter_id !== req.user.id) throw createHttpError("Unauthorized", 403);

    await deleteJob(req.params.id, req.user.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};