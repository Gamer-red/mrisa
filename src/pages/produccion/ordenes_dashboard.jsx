import React, { useState } from 'react';
import OrdenesStats from './components/ordenes.operador/ordenesstats';
import OrdenesFiltros from './components/ordenes.operador/ordenesfiltros';
import OrdenesLista from './components/ordenes.operador/ordeneslista';
import OrdenForm from './components/ordenes.operador/OrdenForm'; // Importar el formulario

function OrdenesDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregarOrdenClick = () => {
    setMostrarFormulario(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  const handleSubmitForm = (data) => {
    console.log('Nueva orden creada:', data);
    // Aquí puedes agregar la lógica para guardar la orden
    setMostrarFormulario(false);
  };

  return (
    <div className="text-white h-full flex flex-col overflow-hidden">
      {/* Título y Botón */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold">Órdenes de Producción</h1>
        <button
          onClick={handleAgregarOrdenClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Nueva Orden
        </button>
      </div>
      
      {/* Stats - altura fija */}
      <div className="flex-shrink-0">
        <OrdenesStats />
      </div>
      
      {/* Filtros - altura fija */}
      <div className="flex-shrink-0">
        <OrdenesFiltros />
      </div>
      
      {/* Lista - ocupa el espacio restante con scroll */}
      <div className="flex-1 min-h-0">
        <OrdenesLista />
      </div>

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <OrdenForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default OrdenesDashboard;