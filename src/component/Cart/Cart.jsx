import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const { 
    items: cartItems, 
    updateQuantity, 
    removeItem, 
    getSubtotal, 
    getShipping, 
    getTotal 
  } = useCart();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Mon Panier</h1>
        <p>{cartItems.length} article(s) dans votre panier</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <i className="fa-solid fa-cart-shopping"></i>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos délicieux thés et ajoutez-les à votre panier</p>
          <Link to="/tea-collection" className="continue-shopping-btn">
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">€{item.price.toFixed(2)}</div>
                </div>

                <div className="item-quantity">
                  <label>Quantité:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <div className="total-price">€{(item.price * item.quantity).toFixed(2)}</div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                    title="Supprimer l'article"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Résumé de la commande</h3>
              
              <div className="summary-row">
                <span>Sous-total:</span>
                <span>€{getSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Livraison:</span>
                <span>
                  {getShipping() === 0 ? 'Gratuite' : `€${getShipping().toFixed(2)}`}
                </span>
              </div>
              
              {getSubtotal() < 50 && (
                <div className="shipping-note">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>Ajoutez €{(50 - getSubtotal()).toFixed(2)} pour la livraison gratuite</span>
                </div>
              )}
              
              <div className="summary-row total">
                <span>Total:</span>
                <span>€{getTotal().toFixed(2)}</span>
              </div>

              <div className="cart-actions">
                <Link to="/tea-collection" className="continue-btn">
                  <i className="fa-solid fa-arrow-left"></i>
                  Continuer mes achats
                </Link>
                
                <Link to="/billing" className="checkout-btn">
                  <i className="fa-solid fa-credit-card"></i>
                  Passer la commande
                </Link>
              </div>

              <div className="payment-methods">
                <p>Méthodes de paiement acceptées:</p>
                <div className="payment-icons">
                  <i className="fa-brands fa-cc-visa"></i>
                  <i className="fa-brands fa-cc-mastercard"></i>
                  <i className="fa-brands fa-cc-paypal"></i>
                  <i className="fa-brands fa-apple-pay"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
