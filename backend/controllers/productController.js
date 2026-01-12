const Product = require('../models/Product');

// 新增商品
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description, imageUrl } = req.body;

    // 驗證必填項
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: '商品名稱和價格為必填項',
        data: null
      });
    }

    // 建立新商品
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      imageUrl
    });

    // 儲存到資料庫
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: '商品新增成功',
      data: savedProduct
    });
  } catch (error) {
    // 處理 Mongoose 驗證錯誤
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      
      return res.status(400).json({
        success: false,
        message: messages,
        data: null
      });
    }

    // 其他錯誤
    res.status(500).json({
      success: false,
      message: '伺服器錯誤，商品新增失敗',
      data: null
    });
  }
};

// 取得所有商品
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: '取得商品列表成功',
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '伺服器錯誤，取得商品列表失敗',
      data: null
    });
  }
};
// 取得單一商品
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '商品 ID 為必填項',
        data: null
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '找不到該商品',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: '取得商品成功',
      data: product
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '無效的商品 ID',
        data: null
      });
    }

    res.status(500).json({
      success: false,
      message: '伺服器錯誤，取得商品失敗',
      data: null
    });
  }
};


// 更新商品
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, imageUrl } = req.body;

    // 檢查 id 是否有效
    if (!id) {
      return res.status(400).json({
        success: false,
        message: '商品 ID 為必填項',
        data: null
      });
    }

    // 構建更新物件（只更新有提供的欄位）
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    // 找到並更新商品
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // new: true 回傳更新後的文檔，runValidators: 執行驗證
    );

    // 檢查是否找到商品
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: '找不到該商品',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: '商品更新成功',
      data: updatedProduct
    });
  } catch (error) {
    // 處理 Mongoose 驗證錯誤
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      
      return res.status(400).json({
        success: false,
        message: messages,
        data: null
      });
    }

    // 處理無效的 MongoDB ID
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '無效的商品 ID',
        data: null
      });
    }

    // 其他錯誤
    res.status(500).json({
      success: false,
      message: '伺服器錯誤，商品更新失敗',
      data: null
    });
  }
};

// 刪除商品
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 檢查 id 是否有效
    if (!id) {
      return res.status(400).json({
        success: false,
        message: '商品 ID 為必填項',
        data: null
      });
    }

    // 找到並刪除商品
    const deletedProduct = await Product.findByIdAndDelete(id);

    // 檢查是否找到商品
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: '找不到該商品',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: '商品刪除成功',
      data: deletedProduct
    });
  } catch (error) {
    // 處理無效的 MongoDB ID
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '無效的商品 ID',
        data: null
      });
    }

    // 其他錯誤
    res.status(500).json({
      success: false,
      message: '伺服器錯誤，商品刪除失敗',
      data: null
    });
  }
};
