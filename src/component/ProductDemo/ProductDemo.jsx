import React from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './ProductDemo.css';

function ProductDemo() {
  const sampleProducts = [
    {
      id: 1,
      name: "Thé Vert Premium",
      price: 24.99,
      image: "/api/placeholder/200/200",
      description: "Thé vert de qualité supérieure, récolté à la main dans les montagnes du Fuji."
    },
    {
      id: 2,
      name: "Thé Noir Earl Grey",
      price: 19.99,
      image: "/api/placeholder/200/200",
      description: "Thé noir parfumé à la bergamote, parfait pour le petit-déjeuner."
    },
    {
      id: 3,
      name: "Thé Blanc Jasmin",
      price: 29.99,
      image: "/api/placeholder/200/200",
      description: "Thé blanc délicat au jasmin, une expérience sensorielle unique."
    },
    {
      id: 4,
      name: "Thé Rooibos Vanille",
      price: 16.99,
      image: "/api/placeholder/200/200",
      description: "Thé rooibos sans caféine, parfumé à la vanille naturelle."
    }
  ];

  return (
    <div className="product-demo">
      <div className="demo-header">
        <h2>Découvrez nos thés</h2>
        <p>Ajoutez vos thés préférés à votre panier</p>
      </div>
      
      <div className="products-grid">
        {sampleProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">€{product.price.toFixed(2)}</div>
              
              <AddToCartButton 
                product={product} 
                className="product-add-btn"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDemo;
