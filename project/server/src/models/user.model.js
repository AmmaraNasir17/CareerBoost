const pool = require("../config/db");

async function createUser(name, email, password, role) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, password, role]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function updateUserProfile(id, fields) {
  const { name } = fields;
  const result = await pool.query(
    `UPDATE users SET name = COALESCE($1, name) WHERE id = $2
     RETURNING id, name, email, role`,
    [name, id]
  );
  return result.rows[0];
}

async function updateUserPassword(id, hashedPassword) {
  await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, id]
  );
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserPassword
};