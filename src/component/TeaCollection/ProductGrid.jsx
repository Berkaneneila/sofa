import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ filters, sortBy }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les produits depuis le backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products'); 
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const filterProducts = (products) => {
    return products.filter(product => true);
  };

  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')));
      case 'price-high':
        return sorted.sort((a, b) => parseFloat(b.price.replace('€', '')) - parseFloat(a.price.replace('€', '')));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {sortedProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
