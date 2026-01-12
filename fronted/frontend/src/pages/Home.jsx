import womenImg from "../assets/women.jpg";
import menImg from "../assets/men.jpg";
import accImg from "../assets/accessories.jpg";
import heroImg from "../assets/hero.jpg";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <div className="hero-content">
          <h1 className="hero-title">新季上市</h1>
          <p className="hero-subtitle">發現最新的流行趨勢</p>
          <a href="/products" className="hero-button">開始購物</a>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="featured">
        <div className="featured-grid">
          <div className="featured-item">
            <div className="featured-image" style={{ backgroundImage: `url(${womenImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",}}>
            </div>
            <h3>女性</h3>
            <p>探索最新風格</p>
          </div>

          <div className="featured-item">
            <div className="featured-image" style={{ backgroundImage: `url(${menImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",}}>
            </div>
            <h3>男性</h3>
            <p>經典與現代的結合</p>
          </div>

          <div className="featured-item">
            <div className="featured-image" style={{ backgroundImage: `url(${accImg})`,}}>
            </div>
            <h3>配件</h3>
            <p>完美的搭配選擇</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-cards">
          <div className="info-card">
            <h4>免運費</h4>
            <p>滿額訂單享免運費</p>
          </div>
          <div className="info-card">
            <h4>30天退貨</h4>
            <p>輕鬆退貨，無後顧之憂</p>
          </div>
          <div className="info-card">
            <h4>優質客服</h4>
            <p>24小時客服支援</p>
          </div>
        </div>
      </section>
    </div>
  );
}
