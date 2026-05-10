const { createHttpError } = require("../../utils/appError");
const { findQuizById, findQuestionsByQuizId } = require("../../models/quiz.model");
const { createAttempt, findAttemptsByUser, findAttemptsByQuiz } = require("../../models/quizAttempt.model");
const { upsertSkillProgress, updateStreak } = require("../../models/skillProgress.model");
const { calculateQuizScore, getPerformanceLabel } = require("../../utils/scoreCalculator");

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== "object") {
      throw createHttpError("Answers must be provided as an object of question_id: answer", 400);
    }

    const quiz = await findQuizById(req.params.id);
    if (!quiz) throw createHttpError("Quiz not found", 404);

    const questions = await findQuestionsByQuizId(req.params.id);
    if (questions.length === 0) throw createHttpError("This quiz has no questions", 400);

    const { correct, total, scorePercentage, breakdown } = calculateQuizScore(questions, answers);
    const performance = getPerformanceLabel(scorePercentage);

    const attempt = await createAttempt(
      req.user.id,
      req.params.id,
      scorePercentage,
      total,
      breakdown
    );

    await upsertSkillProgress(req.user.id, quiz.topic, scorePercentage);
    await updateStreak(req.user.id);

    res.json({
      message: "Quiz submitted successfully",
      result: {
        score: scorePercentage,
        correct,
        total,
        performance,
        breakdown,
      },
      attempt,
    });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyAttempts = async (req, res) => {
  try {
    const attempts = await findAttemptsByUser(req.user.id);
    res.json({ attempts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAttemptsByQuiz = async (req, res) => {
  try {
    const quiz = await findQuizById(req.params.id);
    if (!quiz) throw createHttpError("Quiz not found", 404);

    const attempts = await findAttemptsByQuiz(req.user.id, req.params.id);
    res.json({ attempts });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};