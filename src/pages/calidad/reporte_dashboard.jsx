import React, { useState } from 'react';
import CalidadLista from './components/calidadlista';
import CalidadForm from './components/calidadform';
import CalidadVerDetalles from './components/CalidadVerDetalles';

function ReporteDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [inspeccionSeleccionada, setInspeccionSeleccionada] = useState(null);
  const [inspecciones, setInspecciones] = useState([
    {
      orden: 'ORD-001',
      producto: 'Engranaje Tipo A',
      tipo: 'Primera Pieza (Setup)',
      operador: 'María García',
      maquina: 'Torno CNC-01',
      fecha: '2024-01-15',
      estado: 'Pendiente',
      tolerancias: [
        { dimension: 'Diámetro exterior', min: 49.95, max: 50.05, nominal: 50.00 }
      ],
      caracteristicasCriticas: ['Dureza HRC 45-50', 'Acabado superficial Ra 1.6'],
      notas: 'Primera pieza del lote, verificar todas las dimensiones'
    },
    {
      orden: 'ORD-002',
      producto: 'Eje Transmisión',
      tipo: 'Final de Producción (Lote)',
      operador: 'Juan Pérez',
      maquina: 'Fresadora-02',
      fecha: '2024-01-14',
      estado: 'Aceptado',
      tolerancias: [
        { dimension: 'Largo total', min: 149.90, max: 150.10, nominal: 150.00 },
        { dimension: 'Diámetro', min: 24.95, max: 25.05, nominal: 25.00 }
      ],
      caracteristicasCriticas: ['Concentricidad 0.02', 'Dureza HRC 40-45'],
      notas: 'Lote completo, todas las piezas dentro de especificaciones'
    },
    {
      orden: 'ORD-003',
      producto: 'Sensor Térmico',
      tipo: 'Primera Pieza (Setup)',
      operador: 'Ana Martínez',
      maquina: 'Banco de Pruebas',
      fecha: '2024-01-13',
      estado: 'Rechazado',
      tolerancias: [
        { dimension: 'Tolerancia térmica', min: -0.5, max: 0.5, nominal: 0.0 }
      ],
      caracteristicasCriticas: ['Precisión ±0.1°C', 'Tiempo de respuesta < 1s'],
      notas: 'La pieza no cumple con la tolerancia térmica requerida'
    },
    {
      orden: 'ORD-004',
      producto: 'Rodamiento Principal',
      tipo: 'Final de Producción (Lote)',
      operador: 'Carlos López',
      maquina: 'Rectificadora-03',
      fecha: '2024-01-12',
      estado: 'Pendiente',
      tolerancias: [
        { dimension: 'Diámetro interior', min: 39.98, max: 40.02, nominal: 40.00 },
        { dimension: 'Ancho', min: 19.95, max: 20.05, nominal: 20.00 }
      ],
      caracteristicasCriticas: ['Rugosidad Ra 0.8', 'Redondez 0.01'],
      notas: 'Último lote del día, revisar con atención'
    },
    {
      orden: 'ORD-005',
      producto: 'Sistema Hidráulico',
      tipo: 'Primera Pieza (Setup)',
      operador: 'Laura Rodríguez',
      maquina: 'Banco de Pruebas',
      fecha: '2024-01-11',
      estado: 'Aceptado',
      tolerancias: [
        { dimension: 'Presión máxima', min: 195, max: 205, nominal: 200 },
        { dimension: 'Flujo', min: 49.5, max: 50.5, nominal: 50.0 }
      ],
      caracteristicasCriticas: ['Estanqueidad', 'Presión de trabajo 200 bar'],
      notas: 'Pruebas hidráulicas completadas exitosamente'
    }
  ]);

  // Función para manejar el click del botón Nueva Inspección
  const handleNuevaInspeccionClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    console.log('Nueva inspección:', data);
    
    // Crear nueva inspección con estado Pendiente
    const nuevaInspeccion = {
      id: Math.max(...inspecciones.map(i => i.id), 0) + 1,
      orden: data.ordenProduccion,
      producto: data.producto,
      tipo: data.tipoInspeccion,
      operador: data.operador,
      maquina: data.maquina,
      turno: data.turno,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      tolerancias: data.tolerancias || [],
      caracteristicasCriticas: data.caracteristicasCriticas || [],
      notas: data.notas || ''
    };

    setInspecciones(prev => [...prev, nuevaInspeccion]);
    setMostrarFormulario(false);
  };

  // Función para ver inspección
  const handleVerInspeccion = (inspeccion) => {
    setInspeccionSeleccionada(inspeccion);
    setMostrarDetalles(true);
  };

  const handleCloseDetalles = () => {
    setMostrarDetalles(false);
    setInspeccionSeleccionada(null);
  };

  // Función para aceptar inspección
  const handleAceptarInspeccion = (inspeccion) => {
    if (window.confirm(`¿Aceptar la inspección ${inspeccion.id} - ${inspeccion.producto}?`)) {
      setInspecciones(prev => prev.map(i => 
        i.id === inspeccion.id 
          ? { ...i, estado: 'Aceptado' }
          : i
      ));
    }
  };

  // Función para rechazar inspección
  const handleRechazarInspeccion = (inspeccion) => {
    if (window.confirm(`¿Rechazar la inspección ${inspeccion.id} - ${inspeccion.producto}?`)) {
      setInspecciones(prev => prev.map(i => 
        i.id === inspeccion.id 
          ? { ...i, estado: 'Rechazado' }
          : i
      ));
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Control de Calidad</h1>
        
        <button 
          onClick={handleNuevaInspeccionClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Nueva Inspección
        </button>
      </div>

      {/* Lista de inspecciones */}
      <CalidadLista 
        inspecciones={inspecciones}
        onVer={handleVerInspeccion}
        onAceptar={handleAceptarInspeccion}
        onRechazar={handleRechazarInspeccion}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <CalidadForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}

      {/* Modal de detalles */}
      {mostrarDetalles && inspeccionSeleccionada && (
        <CalidadVerDetalles 
          inspeccion={inspeccionSeleccionada}
          onClose={handleCloseDetalles}
        />
      )}
    </div>
  );
}

export default ReporteDashboard;