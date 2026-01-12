# 線上商品展示與管理平台｜TODO List
風格定位：簡約風 × 日系（留白、柔和色系、重視圖片）

---

## 一、專案初始化（Project Setup）
- [ ] 建立 GitHub Repo
- [ ] 初始化 Git（git init）
- [ ] 設定 `.gitignore`
- [ ] 撰寫初版 README.md（專題名稱＋簡介）
- [ ] 規劃專案目錄結構
  - frontend/
  - backend/
  - docs/

---

## 二、資料庫設計（MongoDB）
- [ ] 設計 Product 資料結構
  - name（商品名稱）
  - price（價格）
  - category（分類）
  - description（商品描述）
  - imageUrl（圖片）
  - createdAt（建立時間）
- [ ] 建立 MongoDB 資料庫
- [ ] 建立 Product Collection
- [ ] 撰寫 Model（Schema）

---

## 三、後端開發（Backend API）
### 基本設定
- [ ] 初始化後端專案（Node.js / Express）
- [ ] 安裝套件（express, mongoose, cors, dotenv）
- [ ] 設定 MongoDB 連線
- [ ] 建立基本資料夾結構
  - routes/
  - controllers/
  - models/

### CRUD API
- [ ] POST /api/products（新增商品）
- [ ] GET /api/products（取得全部商品）
- [ ] GET /api/products/:id（取得單一商品）
- [ ] PUT /api/products/:id（更新商品）
- [ ] DELETE /api/products/:id（刪除商品）

### API 品質
- [ ] 統一回傳格式（success / message / data）
- [ ] 基本錯誤處理（404 / 500）
- [ ] 測試 API 是否可正常運作（Postman）

---

## 四、前端開發（Frontend）
### 基本設定
- [ ] 建立前端專案（React / Vue 擇一）
- [ ] 設定 API base URL
- [ ] 規劃頁面與元件結構

### 頁面功能
- [ ] 商品列表頁（Product List）
  - 圖片
  - 商品名稱
  - 價格
- [ ] 商品詳細頁（Product Detail）
- [ ] 新增商品頁（表單）
- [ ] 編輯商品頁
- [ ] 刪除商品功能（按鈕）

### UI / 風格
- [ ] 使用簡約配色（白、米色、灰）
- [ ] 留白設計，避免過多裝飾
- [ ] 商品圖片置中、整齊排列
- [ ] RWD（手機可正常顯示）
- [ ] 操作成功 / 失敗提示訊息

---

## 五、前後端串接
- [ ] 前端串接 GET 商品列表 API
- [ ] 前端串接 新增商品 API
- [ ] 前端串接 編輯商品 API
- [ ] 前端串接 刪除商品 API
- [ ] 確認 CRUD 全流程可操作

---

## 六、文件與說明（Documentation）
- [ ] README.md（完整）
  - 專題簡介
  - 技術選型
  - 專案架構
  - 安裝與執行方式
- [ ] API 規格文件（docs/api-spec.md）
- [ ] 系統架構圖（frontend / backend / DB）
- [ ] CRUD 流程圖

---

## 七、Demo 與繳交前檢查
- [ ] 檢查 CRUD 是否全部可用
- [ ] Git commit 次數 ≥ 5
- [ ] Commit message 清楚
- [ ] 錄製 Demo 影片（5–8 分鐘）
  - 商品新增
  - 商品列表
  - 商品編輯
  - 商品刪除
- [ ] 再跑一次完整流程確認無 bug

---

## 八、（選擇性）加分項目
- [ ] 管理者登入（簡易帳密）
- [ ] 商品分類篩選
- [ ] 搜尋商品名稱
- [ ] Figma UI 草稿
