import React, { useState } from 'react';
import './TeaCollection.css';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import Banner from './Banner';

function TeaCollection() {
  const [filters, setFilters] = useState({
    collections: ['Chai'],
    price: [],
    organic: false
  });

  const [sortBy, setSortBy] = useState('default');

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <div className="tea-collection">
      <Banner />
      
      <div className="breadcrumbs">
        <span>HOME</span>
        <span>/</span>
        <span>COLLECTIONS</span>
        <span>/</span>
        <span>CHAI</span>
      </div>

      <div className="collection-content">
        <FilterSidebar 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <div className="main-content">
          <div className="content-header">
            <h1>Chai Tea Collection</h1>
            <div className="sort-container">
              <label>SORT BY:</label>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-dropdown"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          
          <ProductGrid 
            filters={filters}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default TeaCollection;
