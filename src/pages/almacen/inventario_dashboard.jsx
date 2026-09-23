import React, { useState, useEffect } from 'react';
import AlmacenLista from './components/almacenlista';
import AlmacenFiltros from './components/almacenfiltros';
import AlmacenForm from './components/almacenform';
import { obtenerMateriales } from '../../services/almacenService';
function InventarioDashboardAlmacen() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const cargarMateriales = async () => {
        try {
            setLoading(true);
            const data = await obtenerMateriales();
            
            if (data.success) {
                setMateriales(data.data);
            }
        } catch (error) {
            setError(error.message || 'Error al cargar los materiales');
        } finally {
            setLoading(false);
        }
  };

  // Función para manejar el click del botón
  const handleAgregarMaterialClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  const handleFilterChange = (filtro) => {
    setFiltroActivo(filtro);
  };

  const handleMaterialCreado = async (nuevoMaterial) => {
    console.log('Material creado:', nuevoMaterial);
    await cargarMateriales();   
    setMostrarFormulario(false);
};

  const handleSearchChange = (busqueda) => {
    setSearchTerm(busqueda);
  };

   useEffect(() => {
        cargarMateriales();
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Almacén de Materiales</h1>
        
        <button 
          onClick={handleAgregarMaterialClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Agregar Material
        </button>
      </div>

      {/* Filtros */}
      <AlmacenFiltros 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <AlmacenForm 
          onClose={handleCloseForm}
          onSave={handleMaterialCreado} 
        />
      )}

      <AlmacenLista 
                materiales={materiales}
                loading={loading}
                error={error}
        />
    </div>
  );
}

export default InventarioDashboardAlmacen;