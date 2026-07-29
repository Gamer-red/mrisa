import React, { useState } from 'react';

function AlmacenFiltros({ onFilterChange, onSearchChange }) {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Opciones de filtros
  const filtros = [
    'todos',
    'materia prima',
    'insumo',
    'herramienta'
  ];

  const handleFiltroClick = (filtro) => {
    setFiltroActivo(filtro);
    if (onFilterChange) {
      onFilterChange(filtro);
    }
  };

  const handleSearchChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (onSearchChange) {
      onSearchChange(valor);
    }
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4 flex-shrink-0">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Buscar por código, material o tipo..."
            value={busqueda}
            onChange={handleSearchChange}
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        {/* Filtros */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Categoría:</span>
          <div className="flex flex-wrap gap-2">
            {filtros.map((filtro) => (
              <button
                key={filtro}
                onClick={() => handleFiltroClick(filtro)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  filtroActivo === filtro
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600'
                }`}
              >
                {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlmacenFiltros;