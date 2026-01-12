const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ⭐ 關鍵：包含 role
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "token 無效" });
  }
}

module.exports = verifyToken;
