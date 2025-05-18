import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getStockPrice } from '../../services/api';
import { formatImageURL, formatPrice } from '../../utils/formatters';
import SizeOption from '../../components/size-option';
import './style.css';

const PDP = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [skuSelected, setSkuSelected] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);

  const productId = slug.split('-')[0];

  useEffect(() => {
    getProducts()
      .then((products) => {
        const found = products.find((p) => String(p.id) === productId);
        if (!found) {
          alert('Product not found');
          return;
        }
        setProduct(found);
        setSkuSelected(found.skus[0].code);
      })
      .catch((err) => alert('Error loading product: ' + err.message));
  }, [productId]);

  useEffect(() => {
    if (!skuSelected) return;
    const fetchStock = () => {
      getStockPrice(skuSelected)
        .then(setStockInfo)
        .catch(() => alert('Error fetching stock information'));
    };

    fetchStock();
    const interval = setInterval(fetchStock, 5000);

    return () => clearInterval(interval);
  }, [skuSelected]);

  if (!product) {
    return (
      <section className="pdp-container loading">
        <img
          src="/loading.svg"
          alt="Loading"
          className="spinner"
          width={50}
        />
        <p>Loading product</p>
      </section>
    );
  }

  return (
    <main>
      <nav>
        <button
          className="dummy-button"
          onClick={() => window.history.back()}
        >
          <img
            src="/arrow-left.svg"
            alt="Back"
            width={20}
          />
        </button>
        <strong>Detail</strong>
        <button className="dummy-button">
          <img
            src="/dots.svg"
            alt="Options"
            width={15}
          />
        </button>
      </nav>
      <section className="pdp-container">
        {product && (
          <>
            <img
              className="product-image"
              src={formatImageURL(product.image)}
              alt={product.brand}
              height="300"
            />
            <section className="product-details">
              <section className="product-title">
                <div className="product-name-price">
                  <h2>{product.brand}</h2>
                  {stockInfo && <p>{formatPrice(stockInfo.price)}</p>}
                </div>
                <p className="secondary-text">
                  Origin: {product.origin} |
                  {stockInfo && stockInfo.stock > 0
                    ? ` Stock: ${stockInfo.stock}`
                    : ' Out of stock'}
                </p>
              </section>
              <section className="product-description">
                <h4>Description</h4>
                <p className="secondary-text">{product.information}</p>
              </section>
              <section className="product-size">
                <h4>Size</h4>
                <div className="size-options">
                  {product &&
                    product.skus.map((sku, i) => (
                      <SizeOption
                        key={i}
                        sku={sku}
                        selected={sku.code === skuSelected}
                        onClick={setSkuSelected}
                      ></SizeOption>
                    ))}
                </div>
              </section>
              <section className="product-actions">
                <button
                  className="cart-button"
                  onClick={() => alert(`Add to cart: SKU ${skuSelected}`)}
                  disabled={!stockInfo || stockInfo.stock <= 0}
                >
                  <img
                    src="/bag.svg"
                    alt="Open Cart"
                    width={20}
                  />
                </button>
                <button
                  className="add-button"
                  onClick={() => alert(`Add to cart: SKU ${skuSelected}`)}
                  disabled={!stockInfo || stockInfo.stock <= 0}
                >
                  Add to Cart
                </button>
              </section>
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default PDP;
