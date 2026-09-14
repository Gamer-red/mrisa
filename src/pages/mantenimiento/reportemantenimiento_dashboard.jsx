import React, { useState } from 'react';
import MantenimientoLista from './components/MantenimientoLista';
import MantenimientoForm from './components/MantenimientoForm';

function ReporteMantenimientoDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

  // Datos de ejemplo de máquinas
  const maquinas = [
  ];

  // Función para manejar el click del botón Programar
  const handleProgramarClick = (maquina) => {
    setMaquinaSeleccionada(maquina);
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
    setMaquinaSeleccionada(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    console.log('Mantenimiento programado:', data);
    setMostrarFormulario(false);
    setMaquinaSeleccionada(null);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón Programar */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Mantenimiento de Máquinas</h1>
        
        <button 
          onClick={() => handleProgramarClick(null)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Programar
        </button>
      </div>

      {/* Tabla de máquinas */}
      <MantenimientoLista 
        maquinas={maquinas}
        onProgramar={handleProgramarClick}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <MantenimientoForm 
          maquinaSeleccionada={maquinaSeleccionada}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default ReporteMantenimientoDashboard;