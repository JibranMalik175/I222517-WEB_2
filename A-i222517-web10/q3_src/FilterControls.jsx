import React from 'react';

export default function FilterControls({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-controls">
      {['All', 'Active', 'Completed'].map(f => (
        <button 
          key={f} 
          className={currentFilter === f.toLowerCase() ? 'active-filter' : ''}
          onClick={() => onFilterChange(f.toLowerCase())}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
