import { useEffect, useState } from "react";
import "../App.css";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    description: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("all");

  const CATEGORY_OPTIONS = [
    { value: "tops", label: "上衣" },
    { value: "bottoms", label: "下身" },
    { value: "accessories", label: "配件" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts([data.data, ...products]);
          setFormData({
            name: "",
            price: "",
            category: "",
            imageUrl: "",
            description: "",
          });
        } else {
          alert(data.message);
        }
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("確定要刪除這個商品嗎？")) return;

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(products.filter((p) => p._id !== id));
        } else {
          alert(data.message);
        }
      });
  };

  const handleEdit = (product) => {
    const newName = prompt("商品名稱", product.name);
    if (newName === null) return;

    const newPrice = prompt("價格", product.price);
    if (newPrice === null) return;

    const categoryLabels = CATEGORY_OPTIONS.map(
      (c) => `${c.value}（${c.label}）`
    ).join("\n");

    const newCategory = prompt(
      `請選擇分類（請輸入對應英文值）\n${categoryLabels}`,
      product.category || "tops"
    );
    if (newCategory === null) return;

    const validCategory = CATEGORY_OPTIONS.some(
      (c) => c.value === newCategory
    );
    if (!validCategory) {
      alert("分類不正確，請使用指定的分類選項");
      return;
    }

    const newImageUrl = prompt("圖片 URL", product.imageUrl || "");
    if (newImageUrl === null) return;

    const newDescription = prompt("商品描述", product.description || "");
    if (newDescription === null) return;

    fetch(`http://localhost:3000/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        price: Number(newPrice),
        category: newCategory,
        imageUrl: newImageUrl,
        description: newDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(
            products.map((p) =>
              p._id === product._id ? data.data : p
            )
          );
        } else {
          alert(data.message);
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container">
      <h1 className="title">商品管理後台</h1>

      <select
        className="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">全部分類</option>
        <option value="tops">上衣</option>
        <option value="bottoms">下身</option>
        <option value="accessories">配件</option>
      </select>

      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">新增商品</h2>

        <input
          name="name"
          placeholder="商品名稱"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="價格"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">請選擇分類</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          name="imageUrl"
          placeholder="圖片 URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="商品描述"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">新增商品</button>
      </form>

      <div className="grid">
        {loading && <p className="status">Loading...</p>}

        {!loading && filteredProducts.length === 0 && (
          <p className="status">目前沒有商品</p>
        )}

        {filteredProducts.map((product) => (
          <div className="card" key={product._id}>
            <div className="image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </div>

            <div className="info">
              <p className="name">{product.name}</p>
              <p className="price">NT$ {product.price}</p>

              <button
                className="edit-btn"
                onClick={() => handleEdit(product)}
              >
                編輯
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(product._id)}
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
