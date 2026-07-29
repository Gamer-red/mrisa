import React, { useState } from 'react';

function OrdenesFiltros() {
  const [estadoFiltro, setEstadoFiltro] = useState('todas');
  const [prioridadFiltro, setPrioridadFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Buscar órdenes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        {/* Filtro de estado */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Estado:</span>
          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="proceso">En Proceso</option>
            <option value="pausado">Pausado</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        
        {/* Filtro de prioridad */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Prioridad:</span>
          <select
            value={prioridadFiltro}
            onChange={(e) => setPrioridadFiltro(e.target.value)}
            className="bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="todas">Todas</option>
            <option value="baja">Baja</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default OrdenesFiltros;