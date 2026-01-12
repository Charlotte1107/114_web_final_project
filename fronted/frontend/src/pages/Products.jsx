import { useEffect, useState } from "react";
import "../App.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      <h1 className="title">商品列表</h1>

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

      {loading && <p className="status">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="status">目前沒有商品</p>
      )}

      <div className="grid">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
