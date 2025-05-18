import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStockPrice } from '../../services/api';
import { formatImageURL } from '../../utils/formatters';
import './style.css';

const ProductCard = ({ product }) => {
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  const getProductUrl = () => {
    const brandSlug = product.brand.toLowerCase().replace(/\s+/g, '-');
    return `/product/${product.id}-${brandSlug}`;
  };

  useEffect(() => {
    if (product.skus.length > 0) {
      const firstSku = product.skus[0];
      getStockPrice(firstSku.code)
        .then((data) => setPrice(data.price))
        .catch(() => setPrice(null));
    }
  }, [product]);

  return (
    <div
      className="product-card"
      onClick={() => navigate(getProductUrl())}
    >
      <p>{product.brand}</p>
      <img
        src={formatImageURL(product.image)}
        alt={product.name}
        height={150}
      />
      <div className="product-info">
        <p>${(price / 100).toFixed(2)}</p>
        <div className="more-button">
          <img
            width={20}
            src="/add.svg"
            alt="View Product"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
