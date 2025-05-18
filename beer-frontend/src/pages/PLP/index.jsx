import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/product-card';
import './style.css';

export default function PLP() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <main>
      <nav>
        <button className="dummy-button">
          <img
            src="/menu.svg"
            alt="menu"
            width={20}
          />
        </button>
        <img
          src="/user.jpg"
          alt="User"
          width={32}
          height={32}
          style={{ borderRadius: '50%' }}
        />
      </nav>
      <section className="plp-container">
        <p className="secondary-text">Hi Mr. Michael,</p>
        <h1>Welcome Back!</h1>
        <h3>Our Products</h3>
        <section className="products-list">
          {products.length === 0 ? (
            <p>No products available at the moment.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
}
