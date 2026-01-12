function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "需要管理者權限",
    });
  }
  next();
}

module.exports = requireAdmin;
