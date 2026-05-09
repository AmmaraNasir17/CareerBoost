const pool = require("../config/db");

async function findApplierProfileByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM applier_profiles WHERE user_id = $1",
    [userId]
  );
  return result.rows[0];
}

async function upsertApplierProfile(userId, fields) {
  const { skills, experience, education } = fields;
  const result = await pool.query(
    `INSERT INTO applier_profiles (user_id, skills, experience, education)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id) DO UPDATE
     SET skills = COALESCE($2, applier_profiles.skills),
         experience = COALESCE($3, applier_profiles.experience),
         education = COALESCE($4, applier_profiles.education)
     RETURNING *`,
    [userId, skills, experience, education]
  );
  return result.rows[0];
}

module.exports = {
  findApplierProfileByUserId,
  upsertApplierProfile,
};