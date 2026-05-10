const { createHttpError } = require("../../utils/appError");
const {
  findAllQuizzes,
  findQuizById,
  findQuestionsByQuizId,
  createQuiz,
  createQuestion,
} = require("../../models/quiz.model");

exports.getAllQuizzes = async (req, res) => {
  try {
    const filters = {
      topic: req.query.topic,
      difficulty: req.query.difficulty,
    };

    const quizzes = await findAllQuizzes(filters);
    res.json({ quizzes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await findQuizById(req.params.id);
    if (!quiz) throw createHttpError("Quiz not found", 404);

    const questions = await findQuestionsByQuizId(req.params.id);

    const sanitizedQuestions = questions.map(({ correct_answer, ...rest }) => rest);

    res.json({ quiz, questions: sanitizedQuestions });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await createQuiz(req.body);
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const quiz = await findQuizById(req.params.id);
    if (!quiz) throw createHttpError("Quiz not found", 404);

    const question = await createQuestion(req.params.id, req.body);
    res.status(201).json({ message: "Question added successfully", question });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};