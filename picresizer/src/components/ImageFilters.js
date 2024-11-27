import React from 'react';

const filters = [
  { name: 'Normal', filter: 'none' },
  { name: 'Escala de grises', filter: 'grayscale(100%)' },
  { name: 'Sepia', filter: 'sepia(100%)' },
  { name: 'Invertir', filter: 'invert(100%)' },
  { name: 'Desenfoque', filter: 'blur(5px)' },
  { name: 'Brillo', filter: 'brightness(150%)' },
];

const ImageFilters = ({ onFilterChange, currentFilter }) => {
  return (
    <div className="image-filters text-center">
      <h2>Filtros de Imagen</h2>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onFilterChange(filter.filter)}
            className={`filter-button ${currentFilter === filter.filter ? 'filter-button-active' : ''}`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageFilters;
