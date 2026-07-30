import React, { useState } from 'react';

function MetrologiaForm({ onClose, onSubmit, instrumentoEditar }) {
  const [formData, setFormData] = useState({
    codigoInterno: instrumentoEditar?.codigoInterno || '',
    nombre: instrumentoEditar?.nombre || '',
    tipo: instrumentoEditar?.tipo || '',
    ubicacion: instrumentoEditar?.ubicacion || '',
    marca: instrumentoEditar?.marca || '',
    modelo: instrumentoEditar?.modelo || '',
    nSerie: instrumentoEditar?.nSerie || '',
    rangoMedicion: instrumentoEditar?.rangoMedicion || '',
    resolucion: instrumentoEditar?.resolucion || '',
    exactitud: instrumentoEditar?.exactitud || '',
    notas: instrumentoEditar?.notas || '',
    estado: instrumentoEditar?.estado || 'Activo'
  });

  // Opciones para los listboxes
  const opcionesTipo = [
    'Seleccionar...',
    'Calibrador',
    'Micrómetro'
  ];

  const opcionesEstado = [
    'Activo',
    'Inactivo',
    'En Calibración'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.codigoInterno.trim()) {
      alert('El código interno es requerido');
      return;
    }
    if (!formData.nombre.trim()) {
      alert('El nombre descriptivo es requerido');
      return;
    }
    if (!formData.tipo || formData.tipo === 'Seleccionar...') {
      alert('Seleccione un tipo de instrumento');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">
            {instrumentoEditar ? 'Editar Instrumento' : 'Nuevo Instrumento'}
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Código Interno */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Código Interno <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="codigoInterno"
                value={formData.codigoInterno}
                onChange={handleChange}
                placeholder="Ej: INS-001"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Nombre Descriptivo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Descriptivo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Calibrador de Altura"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Tipo de Instrumento */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Instrumento <span className="text-red-400">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesTipo.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ubicación <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Laboratorio A-1"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Marca <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Ej: Mitutoyo"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ej: 500-196-30"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* N° Serie */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                N° Serie <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nSerie"
                value={formData.nSerie}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado <span className="text-red-400">*</span>
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesEstado.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Rango de Medición */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rango de Medición
              </label>
              <input
                type="text"
                name="rangoMedicion"
                value={formData.rangoMedicion}
                onChange={handleChange}
                placeholder="Ej: 0-100 mm"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Resolución */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resolución
              </label>
              <input
                type="text"
                name="resolucion"
                value={formData.resolucion}
                onChange={handleChange}
                placeholder="Ej: 0.01 mm"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Exactitud */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Exactitud
              </label>
              <input
                type="text"
                name="exactitud"
                value={formData.exactitud}
                onChange={handleChange}
                placeholder="Ej: ±0.002 mm"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Notas */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notas
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows="3"
              placeholder="Observaciones adicionales del instrumento..."
              className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
            >
              {instrumentoEditar ? 'Actualizar Instrumento' : 'Guardar Instrumento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MetrologiaForm;