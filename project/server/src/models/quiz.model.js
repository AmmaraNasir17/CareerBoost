const pool = require("../config/db");

async function createQuiz(fields) {
  const { title, topic, difficulty } = fields;
  const result = await pool.query(
    `INSERT INTO quizzes (title, topic, difficulty)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, topic, difficulty]
  );
  return result.rows[0];
}

async function findAllQuizzes(filters) {
  const { topic, difficulty } = filters;

  let query = `SELECT * FROM quizzes WHERE 1=1`;
  const values = [];
  let i = 1;

  if (topic) {
    query += ` AND topic ILIKE $${i++}`;
    values.push(`%${topic}%`);
  }
  if (difficulty) {
    query += ` AND difficulty = $${i++}`;
    values.push(difficulty);
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);
  return result.rows;
}

async function findQuizById(id) {
  const result = await pool.query(
    `SELECT * FROM quizzes WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function findQuestionsByQuizId(quizId) {
  const result = await pool.query(
    `SELECT * FROM quiz_questions WHERE quiz_id = $1 ORDER BY position ASC`,
    [quizId]
  );
  return result.rows;
}

async function createQuestion(quizId, fields) {
  const { question_text, options, correct_answer, position } = fields;
  const result = await pool.query(
    `INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer, position)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [quizId, question_text, JSON.stringify(options), correct_answer, position]
  );
  return result.rows[0];
}

module.exports = {
  createQuiz,
  findAllQuizzes,
  findQuizById,
  findQuestionsByQuizId,
  createQuestion,
};