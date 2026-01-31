import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const { items: cartItems, clearCart } = useCart();

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab('form');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setActiveTab('products');
  };

  const handleProductSaved = () => {
    setEditingProduct(null);
    setActiveTab('products');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration</h1>
        <p>Gérez vos produits et commandes</p>
      </div>

      <div className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <i className="fa-solid fa-box"></i>
          Produits
        </button>
        <button 
          className={`nav-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <i className="fa-solid fa-plus"></i>
          {editingProduct ? 'Modifier Produit' : 'Nouveau Produit'}
        </button>
        <button 
          className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <i className="fa-solid fa-shopping-cart"></i>
          Commandes
        </button>
        <button 
          className={`nav-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <i className="fa-solid fa-chart-bar"></i>
          Statistiques
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && (
          <ProductList onEditProduct={handleEditProduct} />
        )}
        
        {activeTab === 'form' && (
          <ProductForm 
            product={editingProduct}
            onCancel={handleCancelEdit}
            onSave={handleProductSaved}
          />
        )}
        
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Commandes</h2>
            <div className="orders-stats">
              <div className="stat-card">
                <h3>Commandes en cours</h3>
                <span className="stat-number">12</span>
              </div>
              <div className="stat-card">
                <h3>Commandes livrées</h3>
                <span className="stat-number">156</span>
              </div>
              <div className="stat-card">
                <h3>Revenus du mois</h3>
                <span className="stat-number">€2,450</span>
              </div>
            </div>
            
            <div className="recent-orders">
              <h3>Commandes récentes</h3>
              <div className="orders-list">
                <div className="order-item">
                  <div className="order-info">
                    <span className="order-id">#12345</span>
                    <span className="order-customer">Jean Dupont</span>
                    <span className="order-date">15 Jan 2024</span>
                  </div>
                  <div className="order-status">
                    <span className="status pending">En cours</span>
                    <span className="order-total">€45.99</span>
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-info">
                    <span className="order-id">#12344</span>
                    <span className="order-customer">Marie Martin</span>
                    <span className="order-date">14 Jan 2024</span>
                  </div>
                  <div className="order-status">
                    <span className="status delivered">Livrée</span>
                    <span className="order-total">€32.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="stats-section">
            <h2>Statistiques</h2>
            <div className="stats-grid">
              <div className="stat-card large">
                <h3>Ventes du mois</h3>
                <div className="stat-chart">
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '80%'}}></div>
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                </div>
                <span className="stat-number">€2,450</span>
              </div>
              
              <div className="stat-card">
                <h3>Produits vendus</h3>
                <span className="stat-number">156</span>
                <span className="stat-change positive">+12%</span>
              </div>
              
              <div className="stat-card">
                <h3>Nouveaux clients</h3>
                <span className="stat-number">23</span>
                <span className="stat-change positive">+8%</span>
              </div>
              
              <div className="stat-card">
                <h3>Panier moyen</h3>
                <span className="stat-number">€28.50</span>
                <span className="stat-change negative">-3%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
