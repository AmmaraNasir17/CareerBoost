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

// Get applicants of logged-in recruiter
async function getUserApplicants(recruiter_id) {
  const result = await pool.query(
    `SELECT applications.*, users.name, users.email, jobs.title AS "appliedJob"
     FROM applications
     JOIN users ON applications.user_id = users.id
      JOIN jobs ON applications.job_id = jobs.id
      WHERE jobs.created_by=$1
      ORDER BY applied_at DESC`,
    [recruiter_id]
  );

  return result.rows;
}

// Get applications for a specific job
async function getApplicationsForJob(job_id) {
  const result = await pool.query(
    `SELECT applications.*, users.name, users.email, jobs.title AS "appliedJob"
     FROM applications
     JOIN users ON applications.user_id = users.id
     JOIN jobs ON applications.job_id = jobs.id
     WHERE applications.job_id=$1
     ORDER BY applied_at DESC`,
    [job_id]
  );

  return result.rows;
}

// Update application status
async function updateApplicationStatus(application_id, status) {
  const result = await pool.query(
    "UPDATE applications SET status=$1 WHERE id=$2 RETURNING *",
    [status, application_id]
  );

  return result.rows[0];
}

module.exports = {
  createApplication,
  getUserApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  getUserApplicants,
};