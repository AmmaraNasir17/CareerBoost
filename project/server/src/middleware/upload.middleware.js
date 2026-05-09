const upload = require("../config/multer");
const { createHttpError } = require("../utils/appError");

function handleUploadError(err, req, res, next) {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Maximum size is 5MB" });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
}

module.exports = { upload, handleUploadError };