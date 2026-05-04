const pool = require("../config/db");

// Apply to job
async function createApplication(job_id, user_id) {

  // prevent duplicate applications
  const existing = await pool.query(
    "SELECT * FROM applications WHERE job_id=$1 AND user_id=$2",
    [job_id, user_id]
  );

  if (existing.rows.length > 0) {
    throw new Error("Already applied to this job");
  }

  const result = await pool.query(
    `INSERT INTO applications (job_id, user_id)
     VALUES ($1,$2)
     RETURNING *`,
    [job_id, user_id]
  );

  return result.rows[0];
}

// Get applications of logged-in user
async function getUserApplications(user_id) {
  const result = await pool.query(
    `SELECT applications.*, jobs.title, jobs.company
     FROM applications
     JOIN jobs ON applications.job_id = jobs.id
     WHERE applications.user_id=$1
     ORDER BY applied_at DESC`,
    [user_id]
  );

  return result.rows;
}

module.exports = {
  createApplication,
  getUserApplications
};