const { createHttpError } = require("../../utils/appError");
const {
  createApplication,
  findApplicationByJobAndApplier,
  findApplicationsByApplier,
  findApplicationsByJob,
  findApplicationsByRecruiter,
  updateApplicationStatus,
  findApplicationById,
} = require("../../models/application.model");
const { findJobById } = require("../../models/job.model");

const VALID_STATUSES = ["applied", "under_review", "shortlisted", "rejected"];

exports.applyToJob = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);

    const existing = await findApplicationByJobAndApplier(req.params.id, req.user.id);
    if (existing) throw createHttpError("You have already applied to this job", 409);

    const application = await createApplication(req.params.id, req.user.id);
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await findApplicationsByApplier(req.user.id);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getApplicantsForJob = async (req, res) => {
  try {
    const job = await findJobById(req.params.id);
    if (!job) throw createHttpError("Job not found", 404);
    if (job.recruiter_id !== req.user.id) throw createHttpError("Unauthorized", 403);

    const applications = await findApplicationsByJob(req.params.id);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllApplicants = async (req, res) => {
  try {
    const applications = await findApplicationsByRecruiter(req.user.id);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      throw createHttpError(`Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`, 400);
    }

    const application = await findApplicationById(req.params.id);
    if (!application) throw createHttpError("Application not found", 404);

    const updated = await updateApplicationStatus(req.params.id, req.user.id, status);
    if (!updated) throw createHttpError("Unauthorized", 403);

    res.json({ message: "Application status updated", application: updated });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};