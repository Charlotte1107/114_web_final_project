# API 規格文件
## 一、專案 API 規格說明

本文件說明本專案後端所提供之 RESTful API，
包含 使用者註冊 / 登入驗證 以及 商品管理（CRUD）功能。

- API Base URL：
```text
http://localhost:3000/api
```

- 資料格式：JSON
- 驗證方式：JWT（JSON Web Token）

---

## 二、 Authentication（身份驗證）
### 1.使用者註冊（一般使用者）

POST /auth/register

**Request Body**

```json
{
  "username": "testuser",
  "password": "123456"
}
```
**Response（成功）**
```json
{
  "success": true,
  "message": "註冊成功"
}
```
**Response（失敗）**
```json
{
  "success": false,
  "message": "帳號已存在"
}
```

說明
- 註冊的使用者角色預設為 user
- 密碼會經過 bcrypt 加密後儲存

### 2.使用者登入（管理者 / 一般使用者）

POST /auth/login

**Request Body**
```json
{
  "username": "admin",
  "password": "123456"
}
```
**Response（成功）**
```json
{
  "success": true,
  "message": "登入成功",
  "data": {
    "token": "JWT_TOKEN_STRING",
    "user": {
      "id": "664cxxxx",
      "username": "admin",
      "role": "admin"
    }
  }
}
```
**Response（失敗）**
```json
{
  "success": false,
  "message": "帳號或密碼錯誤"
}
```
說明

- 登入成功後會回傳 JWT Token
- Token 內包含使用者 userId 與 role
- 前端需將 token 儲存於 localStorage

### 3. Products（商品管理）
### 3.1 取得所有商品（公開）

GET /products

**Response**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6650xxxx",
      "name": "日系上衣",
      "price": 800,
      "category": "tops",
      "imageUrl": "https://example.com/image.jpg",
      "description": "簡約風格上衣"
    }
  ]
}
```

說明
- 不需登入即可瀏覽商品

### 3.2取得單一商品（公開）

GET /products/:id

**Response**
```json
{
  "success": true,
  "data": {
    "_id": "6650xxxx",
    "name": "日系上衣",
    "price": 800,
    "category": "tops",
    "imageUrl": "https://example.com/image.jpg",
    "description": "簡約風格上衣"
  }
}
```
### 4.新增商品（僅管理者）

POST /products

Headers
```http
Authorization: Bearer JWT_TOKEN
```

**Request Body**
```json
{
  "name": "新商品",
  "price": 1200,
  "category": "tops",
  "imageUrl": "https://example.com/img.jpg",
  "description": "商品描述"
}
```
**Response（成功）**
```json
{
  "success": true,
  "data": {
    "_id": "6651xxxx",
    "name": "新商品",
    "price": 1200,
    "category": "tops"
  }
}
```
**Response（權限不足）**
```json
{
  "success": false,
  "message": "需要管理者權限"
}
```
### 5.更新商品（僅管理者）

PUT /products/:id

Headers
```http
Authorization: Bearer JWT_TOKEN
```

**Request Body**
```json
{
  "name": "更新後商品名稱",
  "price": 1500,
  "category": "bottoms",
  "imageUrl": "",
  "description": "更新後描述"
}
```
### 6. 刪除商品（僅管理者）

DELETE /products/:id

Headers
```http
Authorization: Bearer JWT_TOKEN
```
**Response**
```json
{
  "success": true,
  "message": "商品已刪除"
}
```
--- 

## 三、權限說明（Authorization）
|功能	|權限|
|---|---|
|瀏覽商品	|所有人|
|使用者註冊	|所有人|
|使用者登入	|所有人|
|新增商品	|admin|
|編輯商品	|admin|
|刪除商品	|admin|

---
## 四、 JWT 驗證流程說明

1. 使用者登入後取得 JWT Token
2. 前端將 Token 存入 localStorage
3. 呼叫需驗證 API 時，於 Header 帶入：
```http
Authorization: Bearer <token>
```
4. 後端驗證 Token 並解析使用者角色
