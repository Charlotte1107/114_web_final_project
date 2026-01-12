# 114 Web Final Project｜服飾電商平台

實作一個具備 **使用者註冊 / 登入、管理者後台、商品管理與權限控管** 的簡易服飾電商平台，結合 JWT 驗證與角色權限管理。

---

## 一、專案功能說明

### 使用者功能
- 使用者註冊（僅能註冊一般使用者）
- 使用者登入 / 登出
- 登入後顯示「歡迎，使用者名稱」
- 瀏覽商品列表
- 依商品分類查看商品

### 管理者功能（Admin）
- 管理者登入（帳號由後端預先建立）
- 商品新增 / 編輯 / 刪除
- 管理者後台頁面（僅 admin 可進入）
- 前後端皆有權限驗證（403 Forbidden）

### 權限與安全機制
- 使用 JWT（JSON Web Token）做身分驗證
- 前端以 React Router 保護 admin 路由
- 後端以 middleware 驗證 token 與角色
- 一般使用者無法存取管理 API

---

## 二、技術架構

### Frontend（前端）
- React
- React Router
- Fetch API
- CSS
- Vite

### Backend（後端）
- Node.js
- Express
- MongoDB
- Mongoose
- JWT（jsonwebtoken）
- bcryptjs

---

## 三、專案資料夾結構

```text
114_FINAL_PROJECT
├─ backend
│  ├─ models          # MongoDB schema
│  ├─ routes           # API routes
│  ├─ middleware       # JWT / role 驗證
│  ├─ scripts          # 建立管理者帳號
│  └─ server.js
│
├─ frontend
│  ├─ src
│  │  ├─ pages         # 各頁面（Home / Login / Products / Admin）
│  │  ├─ components    # 共用元件（RequireAdmin）
│  │  ├─ utils         # authFetch
│  │  ├─ assets        # 圖片素材
│  │  ├─ App.jsx
│  │  └─ App.css
│  └─ main.jsx
│
└─ docs
```
##  四、安裝與執行方式
### 1.安裝後端
```bash
cd backend
npm install
```

建立 .env 檔案：
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/final_project
JWT_SECRET=your_secret_key
```

啟動後端伺服器：
```bash
npm run dev
```
### 2.安裝前端
```bash
cd frontend
npm install
npm run dev
```

前端預設啟動於：
```text
http://localhost:5173
```
---

## 五、管理者帳號說明

管理者帳號由後端建立（非註冊取得），
可透過 backend/scripts/createAdmin.js 建立。

範例：
```js
username: admin
password: admin123
role: admin
```

一般使用者註冊時 無法指定角色，一律為 user。

---

## 六、使用說明
一般使用者流程

1. 進入登入頁
2. 點選「註冊」建立帳號
3. 登入後可瀏覽商品
4. Navbar 顯示「歡迎，使用者名稱」

管理者流程

1. 使用管理者帳號登入
2. Navbar 顯示「管理」選項
3. 進入管理頁面
4. 進行商品新增 / 編輯 / 刪除

---

## 七、前端設計說明

- 採用簡約電商風格設計
- 首頁 Hero 區使用圖片背景搭配遮罩
- CSS 依頁面與功能分層管理
- 導覽列依登入狀態與角色動態顯示

