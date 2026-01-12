const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1) 基本檢查
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "請輸入帳號與密碼",
      });
    }

    // 2) 找使用者
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "帳號或密碼錯誤",
      });
    }

    // 3) 比對密碼
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "帳號或密碼錯誤",
      });
    }

    // 4) 簽發 token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "登入成功",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});
// POST /api/auth/register（一般使用者註冊）
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "請輸入帳號與密碼",
      });
    }

    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "帳號已存在",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashed,
      role: "user", // 重點：固定是 user
    });

    await user.save();

    return res.json({
      success: true,
      message: "註冊成功，請登入",
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤",
    });
  }
});

module.exports = router;
