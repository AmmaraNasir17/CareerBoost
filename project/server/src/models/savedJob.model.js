const pool = require("../config/db");

async function saveJob(userId, jobId) {
  const result = await pool.query(
    `INSERT INTO saved_jobs (user_id, job_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, jobId]
  );
  return result.rows[0];
}

async function unsaveJob(userId, jobId) {
  const result = await pool.query(
    `DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2 RETURNING *`,
    [userId, jobId]
  );
  return result.rows[0];
}

async function findSavedJobsByUser(userId) {
  const result = await pool.query(
    `SELECT saved_jobs.*, jobs.title, jobs.location, jobs.job_type,
            jobs.salary, jobs.experience_level, users.name AS recruiter_name
     FROM saved_jobs
     JOIN jobs ON saved_jobs.job_id = jobs.id
     JOIN users ON jobs.recruiter_id = users.id
     WHERE saved_jobs.user_id = $1
     ORDER BY saved_jobs.saved_at DESC`,
    [userId]
  );
  return result.rows;
}

async function findSavedJob(userId, jobId) {
  const result = await pool.query(
    `SELECT * FROM saved_jobs WHERE user_id = $1 AND job_id = $2`,
    [userId, jobId]
  );
  return result.rows[0];
}

module.exports = {
  saveJob,
  unsaveJob,
  findSavedJobsByUser,
  findSavedJob,
};