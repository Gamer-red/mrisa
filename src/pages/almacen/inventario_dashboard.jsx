import React, { useState, useMemo } from 'react';
import AlmacenLista from './components/AlmacenLista';
import AlmacenFiltros from './components/AlmacenFiltros';
import AlmacenForm from './components/almacenform';

function InventarioDashboardAlmacen() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Datos de ejemplo de materiales en almacén
  const [materiales, setMateriales] = useState([
    {
      id: 1,
      codigo: 'MAT-001',
      material: 'Acero Inoxidable 304',
      tipo: 'Materia Prima',
      cantidad: '500 kg',
      ubicacion: 'Almacén A-1',
      stockMinimo: '100 kg',
      stockMaximo: '1000 kg',
      estado: 'Disponible'
    },
    {
      id: 2,
      codigo: 'MAT-002',
      material: 'Perno Hexagonal M8',
      tipo: 'Insumo',
      cantidad: '1000 uds',
      ubicacion: 'Almacén B-3',
      stockMinimo: '200 uds',
      stockMaximo: '2000 uds',
      estado: 'Disponible'
    },
    {
      id: 3,
      codigo: 'MAT-003',
      material: 'Pintura Epóxica',
      tipo: 'Materia Prima',
      cantidad: '200 L',
      ubicacion: 'Almacén C-2',
      stockMinimo: '50 L',
      stockMaximo: '500 L',
      estado: 'Bajo Stock'
    },
    {
      id: 4,
      codigo: 'MAT-004',
      material: 'Taladro Eléctrico',
      tipo: 'Herramienta',
      cantidad: '15 uds',
      ubicacion: 'Taller Principal',
      stockMinimo: '5 uds',
      stockMaximo: '30 uds',
      estado: 'Disponible'
    },
    {
      id: 5,
      codigo: 'MAT-005',
      material: 'Plástico ABS',
      tipo: 'Materia Prima',
      cantidad: '300 kg',
      ubicacion: 'Almacén A-2',
      stockMinimo: '80 kg',
      stockMaximo: '600 kg',
      estado: 'Disponible'
    },
    {
      id: 6,
      codigo: 'MAT-006',
      material: 'Sensor de Temperatura',
      tipo: 'Insumo',
      cantidad: '50 uds',
      ubicacion: 'Línea Producción',
      stockMinimo: '10 uds',
      stockMaximo: '100 uds',
      estado: 'Agotado'
    }
  ]);

  // Filtrar materiales según búsqueda y categoría
  const materialesFiltrados = useMemo(() => {
    return materiales.filter(material => {
      const coincideBusqueda = 
        material.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const coincideFiltro = 
        filtroActivo === 'todos' || 
        material.tipo.toLowerCase() === filtroActivo.toLowerCase();
      
      return coincideBusqueda && coincideFiltro;
    });
  }, [materiales, searchTerm, filtroActivo]);

  // Función para manejar el click del botón
  const handleAgregarMaterialClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    console.log('Nuevo material registrado:', data);
    // Aquí puedes agregar la lógica para guardar el material
    setMostrarFormulario(false);
  };

  // Manejadores de filtros
  const handleFilterChange = (filtro) => {
    setFiltroActivo(filtro);
  };

  const handleSearchChange = (busqueda) => {
    setSearchTerm(busqueda);
  };

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

      {/* Tabla de materiales con scroll */}
      <AlmacenLista materiales={materialesFiltrados} />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <AlmacenForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default InventarioDashboardAlmacen;