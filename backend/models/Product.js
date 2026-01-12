const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '商品名稱為必填項'],
      trim: true,
      maxlength: [100, '商品名稱不能超過100個字符']
    },
    price: {
      type: Number,
      required: [true, '價格為必填項'],
      min: [0, '價格不能為負數']
    },
    category: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // 自動添加 createdAt 和 updatedAt
  }
);

module.exports = mongoose.model('Product', productSchema);
