import React, { useState } from 'react';

function MantenimientoForm({ maquinaSeleccionada, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    maquina: maquinaSeleccionada?.maquina || '',
    tipo: maquinaSeleccionada?.tipo || '',
    frecuencia: '',
    descripcion: '',
    fecha: '',
    costo: '',
    notas: ''
  });

  // Opciones para los listboxes
  const opcionesMaquinas = [
    'Seleccionar...',
    'Torno CNC',
    'Fresadora Universal',
    'Compresor Industrial',
    'Sistema Hidráulico',
    'Robot Soldador',
    'Transportador de Banda'
  ];

  const opcionesTipos = [
    'Seleccionar...',
    'Mecánico',
    'Eléctrico',
    'Hidráulico',
    'Robótico'
  ];

  const opcionesFrecuencia = [
    'Seleccionar...',
    'Diario',
    'Semanal',
    'Quincenal',
    'Mensual',
    'Bimestral',
    'Trimestral',
    'Semestral',
    'Anual'
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
    console.log('Datos del mantenimiento:', formData);
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
            {maquinaSeleccionada ? 'Programar Mantenimiento' : 'Nuevo Mantenimiento'}
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
            {/* Máquina */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Máquina <span className="text-red-400">*</span>
              </label>
              <select
                name="maquina"
                value={formData.maquina}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
                disabled={maquinaSeleccionada}
              >
                {opcionesMaquinas.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
              {maquinaSeleccionada && (
                <p className="text-xs text-gray-400 mt-1">* Máquina pre-seleccionada</p>
              )}
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo <span className="text-red-400">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
                disabled={maquinaSeleccionada}
              >
                {opcionesTipos.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
              {maquinaSeleccionada && (
                <p className="text-xs text-gray-400 mt-1">* Tipo pre-seleccionado</p>
              )}
            </div>

            {/* Frecuencia */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frecuencia <span className="text-red-400">*</span>
              </label>
              <select
                name="frecuencia"
                value={formData.frecuencia}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesFrecuencia.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Costo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Costo <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ej: Mantenimiento preventivo de ejes y husillo"
              className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
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
              placeholder="Instrucciones adicionales o comentarios sobre el mantenimiento..."
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
              {maquinaSeleccionada ? 'Programar Mantenimiento' : 'Agregar Mantenimiento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MantenimientoForm;