const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = "admin";
    const plainPassword = "admin123";

    // 檢查是否已存在
    const existing = await User.findOne({ username });
    if (existing) {
      console.log("admin 已存在");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("admin 建立成功");
    console.log("帳號：admin");
    console.log("密碼：admin123");

    process.exit();
  } catch (err) {
    console.error("建立 admin 失敗", err);
    process.exit(1);
  }
}

createAdmin();
