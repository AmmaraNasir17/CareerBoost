const pool = require("../config/db");

async function createApplication(jobId, applierId) {
  const result = await pool.query(
    `INSERT INTO applications (job_id, applier_id)
     VALUES ($1, $2)
     RETURNING *`,
    [jobId, applierId]
  );
  return result.rows[0];
}

async function findApplicationByJobAndApplier(jobId, applierId) {
  const result = await pool.query(
    `SELECT * FROM applications WHERE job_id = $1 AND applier_id = $2`,
    [jobId, applierId]
  );
  return result.rows[0];
}

async function findApplicationsByApplier(applierId) {
  const result = await pool.query(
    `SELECT applications.*, jobs.title AS job_title, jobs.location, jobs.job_type,
            users.name AS recruiter_name
     FROM applications
     JOIN jobs ON applications.job_id = jobs.id
     JOIN users ON jobs.recruiter_id = users.id
     WHERE applications.applier_id = $1
     ORDER BY applications.applied_at DESC`,
    [applierId]
  );
  return result.rows;
}

async function findApplicationsByJob(jobId) {
  const result = await pool.query(
    `SELECT applications.*, users.name AS applier_name, users.email AS applier_email
     FROM applications
     JOIN users ON applications.applier_id = users.id
     WHERE applications.job_id = $1
     ORDER BY applications.applied_at DESC`,
    [jobId]
  );
  return result.rows;
}

async function findApplicationsByRecruiter(recruiterId) {
  const result = await pool.query(
    `SELECT applications.*, jobs.title AS job_title,
            users.name AS applier_name, users.email AS applier_email
     FROM applications
     JOIN jobs ON applications.job_id = jobs.id
     JOIN users ON applications.applier_id = users.id
     WHERE jobs.recruiter_id = $1
     ORDER BY applications.applied_at DESC`,
    [recruiterId]
  );
  return result.rows;
}

async function updateApplicationStatus(id, recruiterId, status) {
  const result = await pool.query(
    `UPDATE applications
     SET status = $1
     FROM jobs
     WHERE applications.id = $2
       AND applications.job_id = jobs.id
       AND jobs.recruiter_id = $3
     RETURNING applications.*`,
    [status, id, recruiterId]
  );
  return result.rows[0];
}

async function findApplicationById(id) {
  const result = await pool.query(
    `SELECT * FROM applications WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createApplication,
  findApplicationByJobAndApplier,
  findApplicationsByApplier,
  findApplicationsByJob,
  findApplicationsByRecruiter,
  updateApplicationStatus,
  findApplicationById,
};