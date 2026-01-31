import React from 'react';
import './FilterSidebar.css';

function FilterSidebar({ filters, onFilterChange }) {
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  return (
    <div className="filter-sidebar">
      <h3>Collections</h3>
      <label>
        <input
          type="checkbox"
          checked={filters.collections?.includes('Chai') || false}
          onChange={() => handleCheckboxChange('collections', 'Chai')}
        />
        Chai
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.collections?.includes('Green teas') || false}
          onChange={() => handleCheckboxChange('collections', 'Green teas')}
        />
        Green teas
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.collections?.includes('Black teas') || false}
          onChange={() => handleCheckboxChange('collections', 'Black teas')}
        />
        Black teas
      </label>

      <h3>Price Range</h3>
      <label>
        <input
          type="checkbox"
          checked={filters.price?.includes('Under €5') || false}
          onChange={() => handleCheckboxChange('price', 'Under €5')}
        />
        Under €5
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.price?.includes('€5-€10') || false}
          onChange={() => handleCheckboxChange('price', '€5-€10')}
        />
        €5-€10
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.price?.includes('Over €10') || false}
          onChange={() => handleCheckboxChange('price', 'Over €10')}
        />
        Over €10
      </label>

      <h3>Organic</h3>
      <label>
        <input
          type="checkbox"
          checked={filters.organic || false}
          onChange={(e) => onFilterChange('organic', e.target.checked)}
        />
        Organic only
      </label>
    </div>
  );
}

export default FilterSidebar;
