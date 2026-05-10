const pool = require("../config/db");

async function createAttempt(userId, quizId, score, totalQuestions, answers) {
  const result = await pool.query(
    `INSERT INTO quiz_attempts (user_id, quiz_id, score, total_questions, answers)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, quizId, score, totalQuestions, JSON.stringify(answers)]
  );
  return result.rows[0];
}

async function findAttemptsByUser(userId) {
  const result = await pool.query(
    `SELECT quiz_attempts.*, quizzes.title AS quiz_title,
            quizzes.topic, quizzes.difficulty
     FROM quiz_attempts
     JOIN quizzes ON quiz_attempts.quiz_id = quizzes.id
     WHERE quiz_attempts.user_id = $1
     ORDER BY quiz_attempts.attempted_at DESC`,
    [userId]
  );
  return result.rows;
}

async function findAttemptsByQuiz(userId, quizId) {
  const result = await pool.query(
    `SELECT * FROM quiz_attempts
     WHERE user_id = $1 AND quiz_id = $2
     ORDER BY attempted_at DESC`,
    [userId, quizId]
  );
  return result.rows;
}

async function findBestScoreByQuiz(userId, quizId) {
  const result = await pool.query(
    `SELECT MAX(score) AS best_score FROM quiz_attempts
     WHERE user_id = $1 AND quiz_id = $2`,
    [userId, quizId]
  );
  return result.rows[0];
}

module.exports = {
  createAttempt,
  findAttemptsByUser,
  findAttemptsByQuiz,
  findBestScoreByQuiz,
};