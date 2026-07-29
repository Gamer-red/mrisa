import React, { useState } from 'react';
import MantenimientoLista from './components/MantenimientoLista';
import MantenimientoForm from './components/MantenimientoForm';

function ReporteMantenimientoDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

  // Datos de ejemplo de máquinas
  const maquinas = [
    {
      id: 1,
      maquina: 'Torno CNC',
      tipo: 'Mecánico',
      descripcion: 'Mantenimiento preventivo de ejes y husillo',
      frecuencia: 'Mensual',
      estado: 'Pendiente',
      fecha: '2024-01-15',
      proxima: '2024-02-15',
      costo: '$1,500.00'
    },
    {
      id: 2,
      maquina: 'Fresadora Universal',
      tipo: 'Mecánico',
      descripcion: 'Lubricación y calibración de ejes',
      frecuencia: 'Trimestral',
      estado: 'En Proceso',
      fecha: '2024-01-20',
      proxima: '2024-04-20',
      costo: '$2,300.00'
    },
    {
      id: 3,
      maquina: 'Compresor Industrial',
      tipo: 'Eléctrico',
      descripcion: 'Cambio de filtros y aceite',
      frecuencia: 'Semestral',
      estado: 'Completado',
      fecha: '2024-01-10',
      proxima: '2024-07-10',
      costo: '$3,200.00'
    },
    {
      id: 4,
      maquina: 'Sistema Hidráulico',
      tipo: 'Hidráulico',
      descripcion: 'Revisión de sellos y mangueras',
      frecuencia: 'Anual',
      estado: 'Pendiente',
      fecha: '2024-02-01',
      proxima: '2025-02-01',
      costo: '$5,000.00'
    },
    {
      id: 5,
      maquina: 'Robot Soldador',
      tipo: 'Robótico',
      descripcion: 'Calibración y mantenimiento de brazos',
      frecuencia: 'Mensual',
      estado: 'En Proceso',
      fecha: '2024-01-25',
      proxima: '2024-02-25',
      costo: '$4,500.00'
    },
    {
      id: 6,
      maquina: 'Transportador de Banda',
      tipo: 'Mecánico',
      descripcion: 'Ajuste de tensión y rodamientos',
      frecuencia: 'Trimestral',
      estado: 'Pendiente',
      fecha: '2024-02-05',
      proxima: '2024-05-05',
      costo: '$1,800.00'
    }
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