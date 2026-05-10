const pool = require("../config/db");

async function upsertSkillProgress(userId, topic, score) {
  const result = await pool.query(
    `INSERT INTO skill_progress (user_id, topic, latest_score, attempts, last_attempted_at)
     VALUES ($1, $2, $3, 1, NOW())
     ON CONFLICT (user_id, topic) DO UPDATE
     SET latest_score = $3,
         attempts = skill_progress.attempts + 1,
         last_attempted_at = NOW()
     RETURNING *`,
    [userId, topic, score]
  );
  return result.rows[0];
}

async function findSkillProgressByUser(userId) {
  const result = await pool.query(
    `SELECT * FROM skill_progress
     WHERE user_id = $1
     ORDER BY last_attempted_at DESC`,
    [userId]
  );
  return result.rows;
}

async function findWeakAreasByUser(userId) {
  const result = await pool.query(
    `SELECT * FROM skill_progress
     WHERE user_id = $1 AND latest_score < 50
     ORDER BY latest_score ASC`,
    [userId]
  );
  return result.rows;
}

async function updateStreak(userId) {
  const result = await pool.query(
    `INSERT INTO user_streaks (user_id, streak, last_activity_date)
     VALUES ($1, 1, CURRENT_DATE)
     ON CONFLICT (user_id) DO UPDATE
     SET streak = CASE
           WHEN user_streaks.last_activity_date = CURRENT_DATE - INTERVAL '1 day'
           THEN user_streaks.streak + 1
           WHEN user_streaks.last_activity_date = CURRENT_DATE
           THEN user_streaks.streak
           ELSE 1
         END,
         last_activity_date = CURRENT_DATE
     RETURNING *`,
    [userId]
  );
  return result.rows[0];
}

async function findStreakByUser(userId) {
  const result = await pool.query(
    `SELECT * FROM user_streaks WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}

module.exports = {
  upsertSkillProgress,
  findSkillProgressByUser,
  findWeakAreasByUser,
  updateStreak,
  findStreakByUser,
};