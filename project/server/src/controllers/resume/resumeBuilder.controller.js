const { createHttpError } = require("../../utils/appError");
const { upsertResume, findResumeByUserId } = require("../../models/resume.model");
const { generateResumePDF } = require("../../services/pdfExport.service");

exports.getResume = async (req, res) => {
  try {
    const resume = await findResumeByUserId(req.user.id);
    if (!resume) throw createHttpError("No resume found", 404);

    res.json({ resume });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.saveResume = async (req, res) => {
  try {
    const resume = await upsertResume(req.user.id, req.body);
    res.json({ message: "Resume saved successfully", resume });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.exportResumePDF = async (req, res) => {
  try {
    const resume = await findResumeByUserId(req.user.id);
    if (!resume) throw createHttpError("No resume found to export", 404);

    generateResumePDF(resume, res);
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};