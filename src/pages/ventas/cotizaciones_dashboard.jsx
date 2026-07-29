import React, { useState, useMemo } from 'react';
import CotizacionesLista from './components/CotizacionesLista';
import CotizacionForm from './components/CotizacionForm';
import CotizacionFiltros from './components/CotizacionFiltros';
import CotizacionesVerDetalle from './components/CotizacionesVerDetalles';

function VentasDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);
  const [cotizacionEditar, setCotizacionEditar] = useState(null);
  const [filtros, setFiltros] = useState({
    aceptado: 'todos',
    cliente: 'todos',
    fecha: ''
  });

  // Datos de ejemplo de cotizaciones
  const cotizacionesData = [
    {
      id: 1,
      numero: 'COT-001',
      fecha: '2024-01-15',
      cliente: 'Cliente A',
      confirmado: false,
      items: [
        {
          item: 1,
          descripcion: 'Engranaje Tipo A',
          numeroDibujo: 'DIB-001',
          cantidad: 10,
          precioUnitario: 150.00,
          observaciones: 'Sin observaciones'
        },
        {
          item: 2,
          descripcion: 'Eje Transmisión',
          numeroDibujo: 'DIB-002',
          cantidad: 5,
          precioUnitario: 200.00,
          observaciones: 'Urgente'
        }
      ],
      notas: 'Vigencia: 30 días, Condiciones de pago: Crédito a 30 días'
    },
    {
      id: 2,
      numero: 'COT-002',
      fecha: '2024-01-14',
      cliente: 'Cliente B',
      confirmado: true,
      items: [
        {
          item: 1,
          descripcion: 'Sensor Térmico',
          numeroDibujo: 'DIB-003',
          cantidad: 20,
          precioUnitario: 75.00,
          observaciones: 'Entrega inmediata'
        }
      ],
      notas: 'Vigencia: 15 días, Condiciones de pago: Contado'
    },
    {
      id: 3,
      numero: 'COT-003',
      fecha: '2024-01-13',
      cliente: 'Cliente C',
      confirmado: false,
      items: [
        {
          item: 1,
          descripcion: 'Sistema Hidráulico',
          numeroDibujo: 'DIB-004',
          cantidad: 2,
          precioUnitario: 5000.00,
          observaciones: 'Requiere instalación'
        },
        {
          item: 2,
          descripcion: 'Mangueras',
          numeroDibujo: 'DIB-005',
          cantidad: 10,
          precioUnitario: 150.00,
          observaciones: ''
        }
      ],
      notas: 'Vigencia: 45 días, Condiciones de pago: 50% anticipo'
    },
    {
      id: 4,
      numero: 'COT-004',
      fecha: '2024-01-12',
      cliente: 'Cliente A',
      confirmado: true,
      items: [
        {
          item: 1,
          descripcion: 'Rodamiento Principal',
          numeroDibujo: 'DIB-006',
          cantidad: 8,
          precioUnitario: 300.00,
          observaciones: 'Alta precisión'
        }
      ],
      notas: 'Vigencia: 30 días, Condiciones de pago: Crédito a 60 días'
    }
  ];

  // Aplicar filtros
  const cotizacionesFiltradas = useMemo(() => {
    return cotizacionesData.filter(cotizacion => {
      // Filtro por estado (aceptado)
      if (filtros.aceptado === 'pendiente' && cotizacion.confirmado) return false;
      if (filtros.aceptado === 'confirmado' && !cotizacion.confirmado) return false;

      // Filtro por cliente
      if (filtros.cliente !== 'todos' && cotizacion.cliente !== filtros.cliente) return false;

      // Filtro por fecha
      if (filtros.fecha && cotizacion.fecha !== filtros.fecha) return false;

      return true;
    });
  }, [cotizacionesData, filtros]);

  // Función para manejar el cambio de filtros
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  // Función para manejar el click del botón Nueva Cotización
  const handleNuevaCotizacionClick = () => {
    setCotizacionEditar(null);
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
    setCotizacionEditar(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    if (cotizacionEditar) {
      // Editar cotización existente
      const index = cotizacionesData.findIndex(c => c.id === cotizacionEditar.id);
      if (index !== -1) {
        cotizacionesData[index] = { ...data, id: cotizacionEditar.id };
      }
    } else {
      // Crear nueva cotización
      const nuevaCotizacion = {
        ...data,
        id: Math.max(...cotizacionesData.map(c => c.id), 0) + 1
      };
      cotizacionesData.push(nuevaCotizacion);
    }
    setMostrarFormulario(false);
    setCotizacionEditar(null);
  };

  // Función para ver cotización
   const handleVerCotizacion = (cotizacion) => {
    setCotizacionSeleccionada(cotizacion);
    setMostrarDetalles(true);
  };

   const handleCloseDetalles = () => {
    setMostrarDetalles(false);
    setCotizacionSeleccionada(null);
  };

  // Función para confirmar cotización
  const handleConfirmarCotizacion = (cotizacion) => {
    if (window.confirm(`¿Confirmar la cotización ${cotizacion.numero}?`)) {
      const index = cotizacionesData.findIndex(c => c.id === cotizacion.id);
      if (index !== -1) {
        cotizacionesData[index] = { ...cotizacionesData[index], confirmado: true };
      }
    }
  };

  // Función para eliminar cotización
  const handleEliminarCotizacion = (cotizacion) => {
    if (window.confirm(`¿Eliminar la cotización ${cotizacion.numero}?`)) {
      const index = cotizacionesData.findIndex(c => c.id === cotizacion.id);
      if (index !== -1) {
        cotizacionesData.splice(index, 1);
      }
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Cotizaciones</h1>
        
        <button 
          onClick={handleNuevaCotizacionClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Nueva Cotización
        </button>
      </div>

      {/* Filtros */}
      <CotizacionFiltros onFilterChange={handleFilterChange} />

      {/* Lista de cotizaciones filtradas */}
      <CotizacionesLista 
        cotizaciones={cotizacionesFiltradas}
        onVer={handleVerCotizacion}
        onConfirmar={handleConfirmarCotizacion}
        onEliminar={handleEliminarCotizacion}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <CotizacionForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          cotizacionEditar={cotizacionEditar}
        />
      )}
      {mostrarDetalles && cotizacionSeleccionada && (
        <CotizacionesVerDetalle 
          cotizacion={cotizacionSeleccionada}
          onClose={handleCloseDetalles}
        />
      )}
    </div>
  );
}

export default VentasDashboard;