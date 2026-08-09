import React, { useState, useRef  } from 'react';
import { calidadService } from '../../../services/calidadService';

function CalidadForm({ onSubmit,onClose,  }) {
  const [formData, setFormData] = useState({
    ordenProduccion: '',
    tipoInspeccion: '',
    producto: '',
    operador: '',
    maquina: '',
    turno: '',
    tolerancias: [], // Array de objetos { dimension: '', min: '', max: '', nominal: '' }
    caracteristicasCriticas: [], // Array de strings
    notas: ''
  });

 const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado temporal para el campo de tolerancia
  const [toleranciaTemp, setToleranciaTemp] = useState({
    dimension: '',
    min: '',
    max: '',
    nominal: ''
  });

  // Estado temporal para característica crítica
  const [caracteristicaTemp, setCaracteristicaTemp] = useState('');

  // Opciones para los listboxes
  const opcionesOrdenProduccion = [
    'Seleccionar...',
    'ORD-001',
    'ORD-002',
    'ORD-003',
    'ORD-004',
    'ORD-005'
  ];

  const opcionesTipoInspeccion = [
    'Seleccionar...',
    'Primera Pieza (Setup)',
    'Final de Producción (Lote)'
  ];

  const opcionesTurno = [
    'Seleccionar...',
    'Matutino',
    'Vespertino',
  ];

  // Manejar cambios en los inputs principales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en el campo de tolerancia temporal
  const handleToleranciaChange = (e) => {
    const { name, value } = e.target;
    setToleranciaTemp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar tolerancia
  const handleAgregarTolerancia = () => {
    // Validar que todos los campos estén llenos
    if (!toleranciaTemp.dimension.trim()) {
      alert('La dimensión es requerida');
      return;
    }
    if (!toleranciaTemp.min || !toleranciaTemp.max || !toleranciaTemp.nominal) {
      alert('Todos los campos numéricos son requeridos');
      return;
    }

    // Agregar tolerancia al array
    setFormData(prev => ({
      ...prev,
      tolerancias: [...prev.tolerancias, { ...toleranciaTemp }]
    }));

    // Limpiar campos temporales
    setToleranciaTemp({
      dimension: '',
      min: '',
      max: '',
      nominal: ''
    });
  };

  // Eliminar tolerancia
  const handleEliminarTolerancia = (index) => {
    setFormData(prev => ({
      ...prev,
      tolerancias: prev.tolerancias.filter((_, i) => i !== index)
    }));
  };

  // Manejar cambio en característica crítica temporal
  const handleCaracteristicaChange = (e) => {
    setCaracteristicaTemp(e.target.value);
  };

  // Agregar característica crítica
  const handleAgregarCaracteristica = () => {
    if (!caracteristicaTemp.trim()) {
      alert('La característica crítica es requerida');
      return;
    }

    setFormData(prev => ({
      ...prev,
      caracteristicasCriticas: [...prev.caracteristicasCriticas, caracteristicaTemp.trim()]
    }));

    setCaracteristicaTemp('');
  };

  // Eliminar característica crítica
  const handleEliminarCaracteristica = (index) => {
    setFormData(prev => ({
      ...prev,
      caracteristicasCriticas: prev.caracteristicasCriticas.filter((_, i) => i !== index)
    }));
  };

  // Manejar envío del formulario
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {

          await onSubmit(formData);

        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
      };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">Nueva Inspección de Calidad</h2>
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
            {/* Orden de Producción */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Orden de Producción <span className="text-red-400">*</span>
              </label>
              <select
                name="ordenProduccion"
                value={formData.ordenProduccion}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesOrdenProduccion.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Tipo de Inspección */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Inspección <span className="text-red-400">*</span>
              </label>
              <select
                name="tipoInspeccion"
                value={formData.tipoInspeccion}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesTipoInspeccion.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Producto */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Producto <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                placeholder="Ej: Engranaje Tipo A"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Operador */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Operador <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="operador"
                value={formData.operador}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Máquina */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Máquina <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="maquina"
                value={formData.maquina}
                onChange={handleChange}
                placeholder="Ej: Torno CNC-01"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Turno */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Turno <span className="text-red-400">*</span>
              </label>
              <select
                name="turno"
                value={formData.turno}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesTurno.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tolerancias Dimensionales */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tolerancias Dimensionales
            </label>
            
            {/* Campos para agregar tolerancia */}
            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600 mb-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Dimensión <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="dimension"
                    value={toleranciaTemp.dimension}
                    onChange={handleToleranciaChange}
                    placeholder="Ej: Largo, Ancho, Diámetro"
                    className="w-full bg-slate-700/50 text-white px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Mínimo <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="min"
                    value={toleranciaTemp.min}
                    onChange={handleToleranciaChange}
                    placeholder="0.00"
                    step="0.001"
                    className="w-full bg-slate-700/50 text-white px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Máximo <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="max"
                    value={toleranciaTemp.max}
                    onChange={handleToleranciaChange}
                    placeholder="0.00"
                    step="0.001"
                    className="w-full bg-slate-700/50 text-white px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Nominal <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="nominal"
                    value={toleranciaTemp.nominal}
                    onChange={handleToleranciaChange}
                    placeholder="0.00"
                    step="0.001"
                    className="w-full bg-slate-700/50 text-white px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAgregarTolerancia}
                className="mt-3 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Agregar Tolerancia
              </button>
            </div>

            {/* Lista de tolerancias agregadas */}
            {formData.tolerancias.length > 0 && (
              <div className="bg-slate-700/20 rounded-lg border border-slate-600 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400">Dimensión</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400">Mínimo</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400">Máximo</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400">Nominal</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-400">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {formData.tolerancias.map((tol, index) => (
                      <tr key={index} className="hover:bg-slate-700/30">
                        <td className="px-3 py-2 text-sm text-white">{tol.dimension}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.min}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.max}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{tol.nominal}</td>
                        <td className="px-3 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleEliminarTolerancia(index)}
                            className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Características Críticas */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Características Críticas
            </label>
            
            {/* Campo para agregar característica crítica */}
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={caracteristicaTemp}
                onChange={handleCaracteristicaChange}
                placeholder="Ej: Dureza, Acabado superficial, Tolerancia geométrica"
                className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleAgregarCaracteristica}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                Agregar
              </button>
            </div>

            {/* Lista de características críticas agregadas */}
            {formData.caracteristicasCriticas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.caracteristicasCriticas.map((caracteristica, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    {caracteristica}
                    <button
                      type="button"
                      onClick={() => handleEliminarCaracteristica(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              rows="4"
              placeholder="Observaciones adicionales sobre la inspección..."
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
                   disabled={isSubmitting}
                    className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30 ${
                        isSubmitting.current 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {isSubmitting ? "Guardando..." : "Crear Inspección"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CalidadForm;