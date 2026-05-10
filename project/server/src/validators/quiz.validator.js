const { body } = require("express-validator");

const createQuizValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Quiz title is required")
    .isLength({ max: 100 }).withMessage("Title must be under 100 characters"),

  body("topic")
    .trim()
    .notEmpty().withMessage("Topic is required"),

  body("difficulty")
    .notEmpty().withMessage("Difficulty is required")
    .isIn(["easy", "medium", "hard"]).withMessage("Difficulty must be easy, medium or hard"),
];

const addQuestionValidator = [
  body("question_text")
    .trim()
    .notEmpty().withMessage("Question text is required"),

  body("options")
    .isArray({ min: 2 }).withMessage("At least 2 options are required"),

  body("correct_answer")
    .trim()
    .notEmpty().withMessage("Correct answer is required"),

  body("position")
    .optional()
    .isInt({ min: 0 }).withMessage("Position must be a non-negative integer"),
];

const submitQuizValidator = [
  body("answers")
    .notEmpty().withMessage("Answers are required")
    .isObject().withMessage("Answers must be an object of question_id: answer pairs"),
];

module.exports = {
  createQuizValidator,
  addQuestionValidator,
  submitQuizValidator,
};