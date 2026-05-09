const pool = require("../config/db");

async function findRecruiterProfileByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM recruiter_profiles WHERE user_id = $1",
    [userId]
  );
  return result.rows[0];
}

async function upsertRecruiterProfile(userId, fields) {
  const { company_name, company_description } = fields;
  const result = await pool.query(
    `INSERT INTO recruiter_profiles (user_id, company_name, company_description)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id) DO UPDATE
     SET company_name = COALESCE($2, recruiter_profiles.company_name),
         company_description = COALESCE($3, recruiter_profiles.company_description)
     RETURNING *`,
    [userId, company_name, company_description]
  );
  return result.rows[0];
}

module.exports = {
  findRecruiterProfileByUserId,
  upsertRecruiterProfile,
};