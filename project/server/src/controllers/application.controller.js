const {
  getUserApplications,
  getUserApplicants,
  getApplicationsForJob,
  updateApplicationStatus,
} = require("../models/application.model");

// Applier → view own applications
exports.getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.id;
    const applications = await getUserApplications(user_id);

    res.json(applications);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// Recruiter → view own applicants
exports.getMyApplicants = async (req, res) => {
  try {
    const recruiter_id = req.user.id;
    const applications = await getUserApplicants(recruiter_id);
    res.json(applications);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// Recruiter → view applications for a job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const job_id = req.params.jobId;
    const applications = await getApplicationsForJob(job_id);
    res.json(applications);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// Recruiter → update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const application_id = req.params.applicationId;
    const { status } = req.body;
    await updateApplicationStatus(application_id, status);
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json("Server error");
  }
};
