import React, { useState } from 'react';
import EmpleadoForm from '../rh/components/empleadosform';
import EmpleadosLista from '../rh/components/empleadoslista';

function EmpleadosDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Datos de ejemplo de empleados - SOLO DATOS BÁSICOS
  const empleados = [];

  // Función para manejar el click del botón
  const handleAgregarEmpleadoClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    console.log('Nuevo empleado registrado:', data);
    setMostrarFormulario(false);
  };

  // Funciones para los botones de acción
  const handleVer = (empleado) => {
    console.log('Ver empleado:', empleado);
  };

  const handleModificar = (empleado) => {
    console.log('Modificar empleado:', empleado);
  };

  const handleEliminar = (empleado) => {
    console.log('Eliminar empleado:', empleado);
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    return estado === 'Activo' 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Recursos Humanos</h1>
        
        <button 
          onClick={handleAgregarEmpleadoClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Agregar Empleado
        </button>
      </div>

      {/* Tabla de empleados con scroll horizontal y vertical */}
      <EmpleadosLista/>
      {/* Modal del formulario */}
      {mostrarFormulario && (
        <EmpleadoForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default EmpleadosDashboard;