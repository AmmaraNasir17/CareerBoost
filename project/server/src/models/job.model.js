const pool = require("../config/db");

async function createJob(data) {
  const {
    title,
    company,
    location,
    salary,
    type,
    experience_level,
    description,
    created_by
  } = data;

  const result = await pool.query(
    `INSERT INTO jobs 
    (title, company, location, salary, type, experience_level, description, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [title, company, location, salary, type, experience_level, description, created_by]
  );

  return result.rows[0];
}

async function removeJob(id) {
  await pool.query(
    "DELETE FROM jobs WHERE id=$1",
    [id]
  );
}

async function getAllJobs() {
  const result = await pool.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );

  return result.rows;
}

async function getJobById(id) {
  const result = await pool.query(
    "SELECT * FROM jobs WHERE id=$1",
    [id]
  );
  return result.rows[0];
}

async function getJobByUserId(user_id) {
  const result = await pool.query(
    "SELECT * FROM jobs WHERE created_by=$1",
    [user_id]
  );

  return result.rows;
}

module.exports = {
  createJob,
  getAllJobs,
  getJobByUserId,
  getJobById,
  removeJob
};