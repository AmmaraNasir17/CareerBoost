const pool = require("../config/db");

async function createJob(recruiterId, fields) {
  const { title, description, required_skills, salary, location, job_type, experience_level } = fields;
  const result = await pool.query(
    `INSERT INTO jobs (recruiter_id, title, description, required_skills, salary, location, job_type, experience_level)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [recruiterId, title, description, required_skills, salary, location, job_type, experience_level]
  );
  return result.rows[0];
}

async function findAllJobs(filters) {
  const { location, salary_min, salary_max, job_type, experience_level, search } = filters;

  let query = `SELECT jobs.*, users.name AS recruiter_name
               FROM jobs
               JOIN users ON jobs.recruiter_id = users.id
               WHERE 1=1`;
  const values = [];
  let i = 1;

  if (location) {
    query += ` AND jobs.location ILIKE $${i++}`;
    values.push(`%${location}%`);
  }
  if (salary_min) {
    query += ` AND jobs.salary >= $${i++}`;
    values.push(salary_min);
  }
  if (salary_max) {
    query += ` AND jobs.salary <= $${i++}`;
    values.push(salary_max);
  }
  if (job_type) {
    query += ` AND jobs.job_type = $${i++}`;
    values.push(job_type);
  }
  if (experience_level) {
    query += ` AND jobs.experience_level = $${i++}`;
    values.push(experience_level);
  }
  if (search) {
    query += ` AND (jobs.title ILIKE $${i} OR jobs.description ILIKE $${i++})`;
    values.push(`%${search}%`);
  }

  query += ` ORDER BY jobs.created_at DESC`;

  const result = await pool.query(query, values);
  return result.rows;
}

async function findJobById(id) {
  const result = await pool.query(
    `SELECT jobs.*, users.name AS recruiter_name
     FROM jobs
     JOIN users ON jobs.recruiter_id = users.id
     WHERE jobs.id = $1`,
    [id]
  );
  return result.rows[0];
}

async function findJobsByRecruiterId(recruiterId) {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE recruiter_id = $1 ORDER BY created_at DESC`,
    [recruiterId]
  );
  return result.rows;
}

async function updateJob(id, recruiterId, fields) {
  const { title, description, required_skills, salary, location, job_type, experience_level } = fields;
  const result = await pool.query(
    `UPDATE jobs
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         required_skills = COALESCE($3, required_skills),
         salary = COALESCE($4, salary),
         location = COALESCE($5, location),
         job_type = COALESCE($6, job_type),
         experience_level = COALESCE($7, experience_level)
     WHERE id = $8 AND recruiter_id = $9
     RETURNING *`,
    [title, description, required_skills, salary, location, job_type, experience_level, id, recruiterId]
  );
  return result.rows[0];
}

async function deleteJob(id, recruiterId) {
  const result = await pool.query(
    `DELETE FROM jobs WHERE id = $1 AND recruiter_id = $2 RETURNING *`,
    [id, recruiterId]
  );
  return result.rows[0];
}

module.exports = {
  createJob,
  findAllJobs,
  findJobById,
  findJobsByRecruiterId,
  updateJob,
  deleteJob,
};