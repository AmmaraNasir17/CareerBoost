const path = require("path");
const { createHttpError } = require("../../utils/appError");
const { findResumeByUserId, saveUploadedResumePath, saveAnalysisResult } = require("../../models/resume.model");
const { extractTextFromFile, extractKeywordsFromText } = require("../../services/resumeParser.service");
const { calculateMatchScore, calculateATSScore } = require("../../services/skillMatcher.service");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) throw createHttpError("No file uploaded", 400);

    const resume = await findResumeByUserId(req.user.id);
    if (!resume) throw createHttpError("Please create your resume profile first", 400);

    const updated = await saveUploadedResumePath(
      req.user.id,
      req.file.path,
      req.file.originalname
    );

    res.json({ message: "Resume uploaded successfully", file: updated.uploaded_file_name });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.analyzeResume = async (req, res) => {
  try {
    const { job_skills } = req.body;

    const resume = await findResumeByUserId(req.user.id);
    if (!resume) throw createHttpError("No resume found", 404);
    if (!resume.uploaded_file_path) throw createHttpError("Please upload your resume file first", 400);

    const resumeText = await extractTextFromFile(resume.uploaded_file_path);
    const extractedKeywords = extractKeywordsFromText(resumeText);

    const resumeSkills = resume.skills || extractedKeywords;
    const jobSkills = job_skills || [];

    const { matchScore, matched, missingSkills } = calculateMatchScore(resumeSkills, jobSkills);
    const { atsScore, feedback } = calculateATSScore(resumeText);

    const analysisResult = {
      extractedKeywords,
      matchScore,
      matchedSkills: matched,
      missingSkills,
      atsScore,
      atsFeedback: feedback,
    };

    await saveAnalysisResult(req.user.id, JSON.stringify(analysisResult));

    res.json({ message: "Resume analyzed successfully", analysis: analysisResult });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAnalysisResult = async (req, res) => {
  try {
    const resume = await findResumeByUserId(req.user.id);
    if (!resume) throw createHttpError("No resume found", 404);
    if (!resume.analysis_result) throw createHttpError("No analysis found. Please analyze your resume first", 404);

    res.json({ analysis: resume.analysis_result });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};