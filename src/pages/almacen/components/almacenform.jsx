import React, { useState } from 'react';

function AlmacenForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    codigoInterno: '',
    nombre: '',
    tipoClasificacion: '',
    categoriaMaterial: '',
    rutaAbastecimiento: '',
    sePuedeVender: '',
    stockActual: '',
    unidad: '',
    stockMinimo: '',
    costoUnitario: ''
  });

  // Opciones para los listboxes
  const opcionesTipoClasificacion = [
    'Seleccionar...',
    'Materia Prima',
    'Insumo',
  ];

  const opcionesCategoriaMaterial = [
    'Seleccionar...',
    'Metálicos',
    'Plásticos',
    'Químicos',
  ];

  const opcionesRutaAbastecimiento = [
    'Seleccionar...',
    'Proveedor Nacional',
  ];

  const opcionesSePuedeVender = [
    'Seleccionar...',
    'Sí',
    'No'
  ];

  const opcionesUnidad = [
    'Seleccionar...',
    'Kg',
    'g',
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
    console.log('Datos del material:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">Agregar Material</h2>
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
                placeholder="Ej: MAT-001"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Acero Inoxidable 304"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Tipo/Clasificación */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo/Clasificación <span className="text-red-400">*</span>
              </label>
              <select
                name="tipoClasificacion"
                value={formData.tipoClasificacion}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesTipoClasificacion.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Categoría de Material */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría de Material <span className="text-red-400">*</span>
              </label>
              <select
                name="categoriaMaterial"
                value={formData.categoriaMaterial}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesCategoriaMaterial.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Se puede vender? */}
            
            {/* Stock Actual */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock Actual <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="stockActual"
                value={formData.stockActual}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="0.01"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>

            {/* Unidad */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Unidad <span className="text-red-400">*</span>
              </label>
              <select
                name="unidad"
                value={formData.unidad}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesUnidad.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
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
              Agregar Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlmacenForm;