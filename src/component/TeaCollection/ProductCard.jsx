import React from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './ProductCard.css';

function ProductCard({ product }) {
  // Convertir le produit de l'API vers le format attendu par le contexte
  const cartProduct = {
    id: product._id || product.id,
    name: product.name,
    price: parseFloat(product.price.replace('€', '')) || 0,
    image: product.image,
    description: product.description
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <AddToCartButton 
            product={cartProduct}
            className="product-add-btn"
          />
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="price">{product.price}</span>
          <span className="quantity">/ {product.quantity}</span>
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
