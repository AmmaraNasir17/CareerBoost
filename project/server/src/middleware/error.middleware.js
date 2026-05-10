const { AppError } = require("../utils/appError");

module.exports = function (err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.code === "23505") {
    return res.status(409).json({ message: "Resource already exists" });
  }

  if (err.code === "23503") {
    return res.status(404).json({ message: "Referenced resource not found" });
  }

  if (err.code === "22P02") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  return res.status(500).json({ message: "Internal server error" });
};