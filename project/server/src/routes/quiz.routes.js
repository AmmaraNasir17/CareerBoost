const express = require("express");
const router = express.Router();

const quizController = require("../controllers/skills/quiz.controller");
const quizAttemptController = require("../controllers/skills/quizAttempt.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);

router.post("/", authMiddleware, quizController.createQuiz);
router.post("/:id/questions", authMiddleware, quizController.addQuestion);

router.post("/:id/submit", authMiddleware, roleMiddleware("applier"), quizAttemptController.submitQuiz);
router.get("/attempts/my", authMiddleware, roleMiddleware("applier"), quizAttemptController.getMyAttempts);
router.get("/:id/attempts", authMiddleware, roleMiddleware("applier"), quizAttemptController.getAttemptsByQuiz);

module.exports = router;