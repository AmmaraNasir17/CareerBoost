const express = require("express");
const router = express.Router();

const quizController = require("../controllers/skills/quiz.controller");
const quizAttemptController = require("../controllers/skills/quizAttempt.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { createQuizValidator, addQuestionValidator, submitQuizValidator } = require("../validators/quiz.validator");

router.get("/", quizController.getAllQuizzes);
router.get("/attempts/my", authMiddleware, roleMiddleware("applier"), quizAttemptController.getMyAttempts);
router.get("/:id", quizController.getQuizById);
router.get("/:id/attempts", authMiddleware, roleMiddleware("applier"), quizAttemptController.getAttemptsByQuiz);

router.post("/", authMiddleware, createQuizValidator, validate, quizController.createQuiz);
router.post("/:id/questions", authMiddleware, addQuestionValidator, validate, quizController.addQuestion);
router.post("/:id/submit", authMiddleware, roleMiddleware("applier"), submitQuizValidator, validate, quizAttemptController.submitQuiz);

module.exports = router;