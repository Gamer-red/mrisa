import React, { useState } from 'react';
import MetrologiaLista from './components/metrologia/metrologialista';
import MetrologiaForm from './components/metrologia/metrologiaform';

function MetrologiaDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [instrumentoEditar, setInstrumentoEditar] = useState(null);
  const [instrumentos, setInstrumentos] = useState([
    {
      id: 1,
      codigoInterno: 'INS-001',
      nombre: 'Calibrador de Altura',
      tipo: 'Calibrador',
      ubicacion: 'Laboratorio A-1',
      marca: 'Mitutoyo',
      modelo: '500-196-30',
      nSerie: '12345678',
      rangoMedicion: '0-100 mm',
      resolucion: '0.01 mm',
      exactitud: '±0.002 mm',
      estado: 'Activo',
      notas: 'Calibración anual recomendada'
    },
    {
      id: 2,
      codigoInterno: 'INS-002',
      nombre: 'Micrómetro Exterior',
      tipo: 'Micrómetro',
      ubicacion: 'Taller Principal',
      marca: 'Mitutoyo',
      modelo: '293-240-30',
      nSerie: '87654321',
      rangoMedicion: '0-25 mm',
      resolucion: '0.001 mm',
      exactitud: '±0.001 mm',
      estado: 'En Calibración',
      notas: 'Enviado a calibración externa'
    },
    {
      id: 3,
      codigoInterno: 'INS-003',
      nombre: 'Calibrador de Profundidad',
      tipo: 'Calibrador',
      ubicacion: 'Laboratorio A-2',
      marca: 'Starrett',
      modelo: 'S-100',
      nSerie: '11223344',
      rangoMedicion: '0-50 mm',
      resolucion: '0.02 mm',
      exactitud: '±0.005 mm',
      estado: 'Activo',
      notas: ''
    },
    {
      id: 4,
      codigoInterno: 'INS-004',
      nombre: 'Micrómetro de Interiores',
      tipo: 'Micrómetro',
      ubicacion: 'Taller Secundario',
      marca: 'Tesa',
      modelo: 'T-200',
      nSerie: '55667788',
      rangoMedicion: '50-100 mm',
      resolucion: '0.01 mm',
      exactitud: '±0.003 mm',
      estado: 'Inactivo',
      notas: 'Requiere mantenimiento'
    }
  ]);

  // Función para manejar el click del botón Nuevo Instrumento
  const handleNuevoInstrumentoClick = () => {
    setInstrumentoEditar(null);
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
    setInstrumentoEditar(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    if (instrumentoEditar) {
      // Editar instrumento existente
      setInstrumentos(prev => prev.map(instr => 
        instr.id === instrumentoEditar.id 
          ? { ...data, id: instr.id }
          : instr
      ));
    } else {
      // Crear nuevo instrumento
      const nuevoInstrumento = {
        ...data,
        id: Math.max(...instrumentos.map(i => i.id), 0) + 1
      };
      setInstrumentos(prev => [...prev, nuevoInstrumento]);
    }
    setMostrarFormulario(false);
    setInstrumentoEditar(null);
  };

  // Función para ver instrumento
  const handleVerInstrumento = (instrumento) => {
    alert(`DETALLES DEL INSTRUMENTO\n\n` +
      `Código: ${instrumento.codigoInterno}\n` +
      `Nombre: ${instrumento.nombre}\n` +
      `Tipo: ${instrumento.tipo}\n` +
      `Ubicación: ${instrumento.ubicacion}\n` +
      `Marca: ${instrumento.marca}\n` +
      `Modelo: ${instrumento.modelo}\n` +
      `N° Serie: ${instrumento.nSerie}\n` +
      `Rango: ${instrumento.rangoMedicion || 'N/A'}\n` +
      `Resolución: ${instrumento.resolucion || 'N/A'}\n` +
      `Exactitud: ${instrumento.exactitud || 'N/A'}\n` +
      `Estado: ${instrumento.estado}\n` +
      `Notas: ${instrumento.notas || 'Sin notas'}`
    );
  };

  // Función para editar instrumento
  const handleEditarInstrumento = (instrumento) => {
    setInstrumentoEditar(instrumento);
    setMostrarFormulario(true);
  };

  // Función para eliminar instrumento
  const handleEliminarInstrumento = (instrumento) => {
    if (window.confirm(`¿Eliminar el instrumento ${instrumento.codigoInterno} - ${instrumento.nombre}?`)) {
      setInstrumentos(prev => prev.filter(i => i.id !== instrumento.id));
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Metrología</h1>
        
        <button 
          onClick={handleNuevoInstrumentoClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Nuevo Instrumento
        </button>
      </div>

      {/* Lista de instrumentos */}
      <MetrologiaLista 
        instrumentos={instrumentos}
        onVer={handleVerInstrumento}
        onEditar={handleEditarInstrumento}
        onEliminar={handleEliminarInstrumento}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <MetrologiaForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          instrumentoEditar={instrumentoEditar}
        />
      )}
    </div>
  );
}

export default MetrologiaDashboard;