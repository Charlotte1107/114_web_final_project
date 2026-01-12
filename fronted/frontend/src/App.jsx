import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequireAdmin from "./components/RequireAdmin";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  // 頁面重新整理時，從 localStorage 回復狀態
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));
  }, []);

  // 登出
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUsername(null);
  };

  return (
    <BrowserRouter>
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="nav-link">首頁</Link>
          <Link to="/products" className="nav-link">商品</Link>

          {role === "admin" && (
            <Link to="/admin" className="nav-link">管理</Link>
          )}
        </div>

        <div className="nav-right">
          <div className="nav-user-section">
            {token && (
              <span className="nav-welcome">
                歡迎，{username}
              </span>
            )}

            {!token ? (
              <Link to="/login" className="nav-link">登入</Link>
            ) : (
              <button onClick={handleLogout} className="nav-logout-btn">
                登出
              </button>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />

        {/* Login 成功後會回傳 token / role / username */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={(token, role, username) => {
                setToken(token);
                setRole(role);
                setUsername(username);
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
