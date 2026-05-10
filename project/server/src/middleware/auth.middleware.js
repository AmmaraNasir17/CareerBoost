const jwt = require("jsonwebtoken");
const { verifyAuthToken } = require("../services/token.service");

function getAuthTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  return authHeader.split(" ")[1];
}

module.exports = function (req, res, next) {
  const token = getAuthTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const decoded = verifyAuthToken(token);
  if (!decoded) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = decoded;
  next();
};
