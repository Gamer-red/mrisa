import React, { useState } from 'react';

function CalidadVerDetalles({ inspeccion, onClose }) {
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
      'Pendiente': 'bg-yellow-500/20 text-yellow-400',
      'Aceptado': 'bg-green-500/20 text-green-400',
      'Rechazado': 'bg-red-500/20 text-red-400'
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">
            Detalles de Inspección #{inspeccion.id}
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
              Información General
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Orden de Producción</label>
                <p className="text-white text-sm mt-1">{inspeccion.orden}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Producto</label>
                <p className="text-white text-sm mt-1">{inspeccion.producto}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo de Inspección</label>
                <p className="text-white text-sm mt-1">{inspeccion.tipo}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</label>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getEstadoColor(inspeccion.estado)}`}>
                  {inspeccion.estado}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Operador</label>
                <p className="text-white text-sm mt-1">{inspeccion.operador}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Máquina</label>
                <p className="text-white text-sm mt-1">{inspeccion.maquina}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Turno</label>
                <p className="text-white text-sm mt-1">{inspeccion.turno}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</label>
                <p className="text-white text-sm mt-1">{inspeccion.fecha}</p>
              </div>
            </div>
          </div>

          {/* Tolerancias Dimensionales */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Tolerancias Dimensionales
            </h3>
            {inspeccion.tolerancias && inspeccion.tolerancias.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dimensión</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mínimo</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Máximo</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {inspeccion.tolerancias.map((tol, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm text-white">{tol.dimension}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.min}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.max}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.nominal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No hay tolerancias registradas</p>
            )}
          </div>

          {/* Características Críticas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Características Críticas
            </h3>
            {inspeccion.caracteristicasCriticas && inspeccion.caracteristicasCriticas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {inspeccion.caracteristicasCriticas.map((caracteristica, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    {caracteristica}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No hay características críticas registradas</p>
            )}
          </div>

          {/* Notas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Notas
            </h3>
            <p className="text-gray-300 text-sm bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              {inspeccion.notas || 'Sin notas adicionales'}
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

export default CalidadVerDetalles;