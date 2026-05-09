const pool = require("../config/db");

async function createResume(userId, fields) {
  const { personal_info, education, experience, projects, skills } = fields;
  const result = await pool.query(
    `INSERT INTO resumes (user_id, personal_info, education, experience, projects, skills)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, personal_info, education, experience, projects, skills]
  );
  return result.rows[0];
}

async function findResumeByUserId(userId) {
  const result = await pool.query(
    `SELECT * FROM resumes WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}

async function upsertResume(userId, fields) {
  const { personal_info, education, experience, projects, skills } = fields;
  const result = await pool.query(
    `INSERT INTO resumes (user_id, personal_info, education, experience, projects, skills)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (user_id) DO UPDATE
     SET personal_info = COALESCE($2, resumes.personal_info),
         education = COALESCE($3, resumes.education),
         experience = COALESCE($4, resumes.experience),
         projects = COALESCE($5, resumes.projects),
         skills = COALESCE($6, resumes.skills),
         updated_at = NOW()
     RETURNING *`,
    [userId, personal_info, education, experience, projects, skills]
  );
  return result.rows[0];
}

async function saveUploadedResumePath(userId, filePath, originalName) {
  const result = await pool.query(
    `UPDATE resumes
     SET uploaded_file_path = $1, uploaded_file_name = $2, updated_at = NOW()
     WHERE user_id = $3
     RETURNING *`,
    [filePath, originalName, userId]
  );
  return result.rows[0];
}

async function saveAnalysisResult(userId, analysisResult) {
  const result = await pool.query(
    `UPDATE resumes
     SET analysis_result = $1, updated_at = NOW()
     WHERE user_id = $2
     RETURNING *`,
    [analysisResult, userId]
  );
  return result.rows[0];
}

module.exports = {
  createResume,
  findResumeByUserId,
  upsertResume,
  saveUploadedResumePath,
  saveAnalysisResult,
};