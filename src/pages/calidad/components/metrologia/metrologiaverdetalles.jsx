import React, { useState } from 'react';

function MetrologiaVerDetalles({ instrumento, onClose }) {
  const [archivo, setArchivo] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState('');

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setNombreArchivo(file.name);
    }
  };

  // Manejar subida de archivo
  const handleSubirArchivo = () => {
    if (archivo) {
      console.log('Archivo a subir:', archivo);
      alert(`Archivo "${nombreArchivo}" subido correctamente`);
      setArchivo(null);
      setNombreArchivo('');
    } else {
      alert('Seleccione un archivo primero');
    }
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Activo': 'bg-green-500/20 text-green-400',
      'Inactivo': 'bg-red-500/20 text-red-400',
      'En Calibración': 'bg-yellow-500/20 text-yellow-400'
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  // Función para obtener el color del tipo
  const getTipoColor = (tipo) => {
    const colores = {
      'Calibrador': 'bg-blue-500/20 text-blue-400',
      'Micrómetro': 'bg-purple-500/20 text-purple-400'
    };
    return colores[tipo] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">
            Detalles del Instrumento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Información General */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Información del Instrumento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Código Interno</label>
                <p className="text-white text-sm mt-1 font-mono">{instrumento.codigoInterno}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre Descriptivo</label>
                <p className="text-white text-sm mt-1">{instrumento.nombre}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo de Instrumento</label>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getTipoColor(instrumento.tipo)}`}>
                  {instrumento.tipo}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</label>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getEstadoColor(instrumento.estado)}`}>
                  {instrumento.estado}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Ubicación</label>
                <p className="text-white text-sm mt-1">{instrumento.ubicacion}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Marca</label>
                <p className="text-white text-sm mt-1">{instrumento.marca}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Modelo</label>
                <p className="text-white text-sm mt-1">{instrumento.modelo}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">N° Serie</label>
                <p className="text-white text-sm mt-1">{instrumento.nSerie}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Rango de Medición</label>
                <p className="text-white text-sm mt-1">{instrumento.rangoMedicion || 'No especificado'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Resolución</label>
                <p className="text-white text-sm mt-1">{instrumento.resolucion || 'No especificado'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Exactitud</label>
                <p className="text-white text-sm mt-1">{instrumento.exactitud || 'No especificado'}</p>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Notas
            </h3>
            <p className="text-gray-300 text-sm bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              {instrumento.notas || 'Sin notas adicionales'}
            </p>
          </div>

          {/* Subir Archivos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Adjuntar Archivo
            </h3>
            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600 border-dashed">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  {nombreArchivo && (
                    <p className="text-xs text-gray-400 mt-2">
                      Archivo seleccionado: <span className="text-blue-400">{nombreArchivo}</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubirArchivo}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Subir Archivo
                </button>
              </div>
            </div>
          </div>

          {/* Botón Cerrar */}
          <div className="flex justify-end pt-6 border-t border-slate-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetrologiaVerDetalles;