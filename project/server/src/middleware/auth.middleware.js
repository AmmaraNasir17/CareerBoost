const jwt = require("jsonwebtoken");

function getAuthTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  return authHeader.split(" ")[1];
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = function (req, res, next) {
  const token = getAuthTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  req.user = decoded;
  next();
};
