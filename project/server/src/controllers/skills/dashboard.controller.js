const { findApplicationsByApplier } = require("../../models/application.model");
const { findResumeByUserId } = require("../../models/resume.model");
const { findSkillProgressByUser, findStreakByUser } = require("../../models/skillProgress.model");
const { findAttemptsByUser } = require("../../models/quizAttempt.model");
const { findJobsByRecruiterId } = require("../../models/job.model");
const { findApplicationsByRecruiter } = require("../../models/application.model");

exports.getApplierDashboard = async (req, res) => {
  try {
    const [applications, resume, skillProgress, streak, attempts] = await Promise.all([
      findApplicationsByApplier(req.user.id),
      findResumeByUserId(req.user.id),
      findSkillProgressByUser(req.user.id),
      findStreakByUser(req.user.id),
      findAttemptsByUser(req.user.id),
    ]);

    const statusBreakdown = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    const averageSkillScore = skillProgress.length > 0
      ? Math.round(skillProgress.reduce((sum, s) => sum + s.latest_score, 0) / skillProgress.length)
      : 0;

    const resumeStrengthScore = resume?.analysis_result?.atsScore || null;

    res.json({
      totalApplications: applications.length,
      statusBreakdown,
      resumeStrengthScore,
      averageSkillScore,
      streak: streak || { streak: 0 },
      recentApplications: applications.slice(0, 5),
      skillProgress,
      totalQuizAttempts: attempts.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getRecruiterDashboard = async (req, res) => {
  try {
    const [jobs, applications] = await Promise.all([
      findJobsByRecruiterId(req.user.id),
      findApplicationsByRecruiter(req.user.id),
    ]);

    const statusBreakdown = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
    const conversionRate = applications.length > 0
      ? Math.round((shortlisted / applications.length) * 100)
      : 0;

    const applicantsPerJob = jobs.map((job) => ({
      job_id: job.id,
      job_title: job.title,
      applicant_count: applications.filter((a) => a.job_id === job.id).length,
    }));

    res.json({
      totalJobs: jobs.length,
      totalApplicants: applications.length,
      shortlisted,
      conversionRate,
      statusBreakdown,
      applicantsPerJob,
      recentApplications: applications.slice(0, 5),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};