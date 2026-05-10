const { createHttpError } = require("../../utils/appError");
const {
  findSkillProgressByUser,
  findWeakAreasByUser,
  findStreakByUser,
} = require("../../models/skillProgress.model");
const { findAttemptsByUser } = require("../../models/quizAttempt.model");

exports.getSkillProgress = async (req, res) => {
  try {
    const progress = await findSkillProgressByUser(req.user.id);
    res.json({ progress });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getWeakAreas = async (req, res) => {
  try {
    const weakAreas = await findWeakAreasByUser(req.user.id);
    res.json({ weakAreas });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getStreak = async (req, res) => {
  try {
    const streak = await findStreakByUser(req.user.id);
    res.json({ streak: streak || { streak: 0, last_activity_date: null } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [progress, weakAreas, streak, attempts] = await Promise.all([
      findSkillProgressByUser(req.user.id),
      findWeakAreasByUser(req.user.id),
      findStreakByUser(req.user.id),
      findAttemptsByUser(req.user.id),
    ]);

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
      : 0;

    res.json({
      progress,
      weakAreas,
      streak: streak || { streak: 0, last_activity_date: null },
      stats: { totalAttempts, averageScore },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};