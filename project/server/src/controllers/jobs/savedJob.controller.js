const { createHttpError } = require("../../utils/appError");
const { findJobById } = require("../../models/job.model");
const {
  saveJob,
  unsaveJob,
  findSavedJobsByUser,
  findSavedJob,
} = require("../../models/savedJob.model");

exports.getSavedJobs = async (req, res) => {
  try {
    const jobs = await findSavedJobsByUser(req.user.id);
    res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.toggleSaveJob = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);

    const existing = await findSavedJob(req.user.id, req.params.id);

    if (existing) {
      await unsaveJob(req.user.id, req.params.id);
      return res.json({ message: "Job removed from saved list" });
    }

    await saveJob(req.user.id, req.params.id);
    res.json({ message: "Job saved successfully" });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};