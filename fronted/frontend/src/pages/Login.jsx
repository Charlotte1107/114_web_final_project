import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  // ===== 註冊 =====
  const handleRegister = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.message);
        setIsLoading(false);
        return;
      }

      alert("註冊成功，請登入");
      setIsRegister(false);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage("註冊失敗，請稍後再試");
      setIsLoading(false);
    }
  };

  // ===== 登入 =====
  const handleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.message);
        setIsLoading(false);
        return;
      }

      // 存登入資訊
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.user.role);
      localStorage.setItem("username", data.data.user.username);

      // ⭐ 通知 App.jsx 更新狀態
      if (onLogin) {
        onLogin(data.data.token, data.data.user.role, data.data.user.username);
      }

      setIsLoading(false);

      // 導頁
      if (data.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      setErrorMessage("登入失敗，請稍後重試");
      setIsLoading(false);
    }
  };

  // Enter 鍵送出（依模式判斷）
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      isRegister ? handleRegister() : handleLogin();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">
            {isRegister ? "註冊帳戶" : "登入帳戶"}
          </h1>
          <p className="login-subtitle">
            {isRegister ? "建立新的使用者帳號" : "輸入您的帳號和密碼"}
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            isRegister ? handleRegister() : handleLogin();
          }}
        >
          <div className="form-group">
            <input
              type="text"
              className="login-input"
              placeholder="帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="form-underline"></div>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="login-input"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="form-underline"></div>
          </div>

          {errorMessage && (
            <div className="error-message"> {errorMessage}</div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading
              ? isRegister
                ? "註冊中..."
                : "登入中..."
              : isRegister
              ? "註冊"
              : "登入"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? "已經有帳戶？" : "還沒有帳戶？"}
            <a
              href="#"
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(!isRegister);
                setErrorMessage("");
              }}
            >
              {isRegister ? "登入" : "註冊"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
