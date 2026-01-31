import React, { useState, useEffect } from 'react';
import './ProductList.css';

function ProductList({ onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample products data (in real app, this would come from API)
  const sampleProducts = [
    {
      id: '1',
      name: 'Thé Vert Premium',
      price: 24.99,
      quantity: '50g',
      description: 'Thé vert de qualité supérieure, récolté à la main dans les montagnes du Fuji.',
      image: 'https://static.vecteezy.com/system/resources/previews/016/349/669/large_2x/cup-of-tea-with-fresh-tea-leaves-on-saucer-transparant-background-png.png',
      category: 'green',
      origin: 'Japon',
      caffeine: 'medium',
      brewingTime: '3-5 minutes',
      temperature: '80-85°C',
      ingredients: 'Feuilles de thé vert',
      benefits: 'Riche en antioxydants, aide à la digestion',
      stock: 50,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Thé Noir Earl Grey',
      price: 19.99,
      quantity: '100g',
      description: 'Thé noir parfumé à la bergamote, parfait pour le petit-déjeuner.',
      image: 'https://static.vecteezy.com/system/resources/previews/016/349/669/large_2x/cup-of-tea-with-fresh-tea-leaves-on-saucer-transparant-background-png.png',
      category: 'black',
      origin: 'Angleterre',
      caffeine: 'high',
      brewingTime: '4-6 minutes',
      temperature: '95-100°C',
      ingredients: 'Thé noir, huile de bergamote',
      benefits: 'Énergisant, parfum délicat',
      stock: 30,
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Thé Blanc Jasmin',
      price: 29.99,
      quantity: '50g',
      description: 'Thé blanc délicat au jasmin, une expérience sensorielle unique.',
      image: 'https://static.vecteezy.com/system/resources/previews/016/349/669/large_2x/cup-of-tea-with-fresh-tea-leaves-on-saucer-transparant-background-png.png',
      category: 'white',
      origin: 'Chine',
      caffeine: 'low',
      brewingTime: '2-3 minutes',
      temperature: '75-80°C',
      ingredients: 'Thé blanc, fleurs de jasmin',
      benefits: 'Apaisant, parfum floral',
      stock: 25,
      isActive: true,
      createdAt: '2024-01-08'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== productId));
      // Here you would make an API call to delete the product
      console.log('Product deleted:', productId);
    }
  };

  const handleToggleActive = async (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
    // Here you would make an API call to update the product
    console.log('Product status toggled:', productId);
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'price') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getCategoryLabel = (category) => {
    const labels = {
      green: 'Thé Vert',
      black: 'Thé Noir',
      white: 'Thé Blanc',
      oolong: 'Thé Oolong',
      'pu-erh': 'Thé Pu-erh',
      herbal: 'Tisane',
      rooibos: 'Rooibos'
    };
    return labels[category] || category;
  };

  const getCaffeineLabel = (caffeine) => {
    const labels = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
      none: 'Sans caféine'
    };
    return labels[caffeine] || caffeine;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h2>Gestion des produits</h2>
        <p>{filteredAndSortedProducts.length} produit(s) trouvé(s)</p>
      </div>

      <div className="list-controls">
        <div className="search-box">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            <option value="green">Thé Vert</option>
            <option value="black">Thé Noir</option>
            <option value="white">Thé Blanc</option>
            <option value="oolong">Thé Oolong</option>
            <option value="pu-erh">Thé Pu-erh</option>
            <option value="herbal">Tisane</option>
            <option value="rooibos">Rooibos</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
          >
            <option value="name-asc">Nom (A-Z)</option>
            <option value="name-desc">Nom (Z-A)</option>
            <option value="price-asc">Prix (croissant)</option>
            <option value="price-desc">Prix (décroissant)</option>
            <option value="stock-asc">Stock (croissant)</option>
            <option value="stock-desc">Stock (décroissant)</option>
            <option value="createdAt-desc">Plus récent</option>
            <option value="createdAt-asc">Plus ancien</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredAndSortedProducts.map(product => (
          <div key={product.id} className={`product-card ${!product.isActive ? 'inactive' : ''}`}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-status">
                <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                  {product.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <div className="detail-row">
                  <span className="label">Prix:</span>
                  <span className="value">€{product.price}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Quantité:</span>
                  <span className="value">{product.quantity}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Catégorie:</span>
                  <span className="value">{getCategoryLabel(product.category)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Origine:</span>
                  <span className="value">{product.origin}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Caféine:</span>
                  <span className="value">{getCaffeineLabel(product.caffeine)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Stock:</span>
                  <span className={`value ${product.stock < 10 ? 'low-stock' : ''}`}>
                    {product.stock} unités
                  </span>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button
                onClick={() => onEditProduct(product)}
                className="action-btn edit"
                title="Modifier"
              >
                <i className="fa-solid fa-edit"></i>
              </button>
              
              <button
                onClick={() => handleToggleActive(product.id)}
                className={`action-btn ${product.isActive ? 'deactivate' : 'activate'}`}
                title={product.isActive ? 'Désactiver' : 'Activer'}
              >
                <i className={`fa-solid ${product.isActive ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="action-btn delete"
                title="Supprimer"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="empty-state">
          <i className="fa-solid fa-box-open"></i>
          <h3>Aucun produit trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
