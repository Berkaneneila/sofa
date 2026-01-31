import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './AddToCartButton.css';

function AddToCartButton({ product, className = '' }) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const currentQuantity = getItemQuantity(product.id);

  const handleAddToCart = async () => {
    console.log('AddToCartButton clicked for product:', product);
    console.log('Current quantity:', currentQuantity);
    
    setIsAdding(true);
    
    try {
      if (currentQuantity > 0) {
        console.log('Updating quantity');
        updateQuantity(product.id, currentQuantity + 1);
      } else {
        console.log('Adding new item');
        const itemToAdd = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          description: product.description
        };
        console.log('Item to add:', itemToAdd);
        addItem(itemToAdd);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    
    setIsAdding(false);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (currentQuantity > 0) {
    return (
      <div className={`quantity-controls ${className}`}>
        <button 
          onClick={() => handleQuantityChange(currentQuantity - 1)}
          className="quantity-btn minus"
          disabled={isAdding}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="quantity">{currentQuantity}</span>
        <button 
          onClick={() => handleQuantityChange(currentQuantity + 1)}
          className="quantity-btn plus"
          disabled={isAdding}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`add-to-cart-btn ${className}`}
    >
      {isAdding ? (
        <>
          <i className="fa-solid fa-spinner fa-spin"></i>
          Ajout...
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus"></i>
          Ajouter au panier
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
