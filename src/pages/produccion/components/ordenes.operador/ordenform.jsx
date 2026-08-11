import React, { useState } from 'react';
import { crearOrdenProduccion } from '../../../../services/produccionService';

function OrdenForm({ onClose, onSubmit }) {

  const [formData, setFormData] = useState({
    id_material: '',
    producto: '',
    cliente: '',
    cantidad: '',
    fecha_inicio: '',
    fecha_entrega: '',
    prioridad: '',
    numero_plano: '',
    lote: '',
    material: '',
    grado_material: '',
    notas: ''
  });

  // Opciones para los listbox
  const opcionesProducto = ['Seleccionar...', 'Producto A', 'Producto B', 'Producto C'];
  const opcionesCliente = ['Seleccionar...', 'Meritor', 'SFK'];
  const opcionesPrioridad = ['Seleccionar...', 'Baja', 'Normal', 'Alta', 'Urgente'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Llamas a la función del service
        const resultado = await crearOrdenProduccion(formData);
        
        // Si llegas aquí, fue exitoso
        console.log('Orden creada:', resultado);
        // Cerrar modal, mostrar mensaje, limpiar form...
        
    } catch (error) {
        // Aquí manejas el error
        alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Nueva Orden de Producción</h2>
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
            {/* Producto desde inventario (opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Producto desde inventario <span className="text-gray-500 text-xs">(opcional)</span>
              </label>
              <select
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              >
                {opcionesProducto.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Producto / Pieza a fabricar */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Producto / Pieza a fabricar <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                placeholder="Ej: Engranaje tipo A"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cliente <span className="text-red-400">*</span>
              </label>
              <select
                name="cliente"
                value = {formData.cliente}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesCliente.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* Cantidad requerida */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cantidad requerida <span className="text-red-400">*</span>
                </label>
                <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    placeholder="Ej: 100"
                    min="0"
                    step="1"
                    className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                />
            </div>
            {/* Fecha Inicio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha Inicio <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Fecha Entrega */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha Entrega <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="fecha_entrega"
                value={formData.fecha_entrega}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Prioridad */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prioridad <span className="text-red-400">*</span>
              </label>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                {opcionesPrioridad.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            {/* No. Plano */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                No. Plano <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="numero_plano"
                value={formData.numero_plano}
                onChange={handleChange}
                placeholder="Ej: PLAN-001"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Lote */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lote <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                placeholder="Ej: LOTE-2024-001"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Material <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Ej: Acero Inoxidable"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Grado del material */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grado del material <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="grado_material"
                value={formData.grado_material}
                onChange={handleChange}
                placeholder="Ej: 304, AISI 316"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Notas / Instrucciones especiales */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notas / Instrucciones especiales
            </label>
            <textarea
              rows="4"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Instrucciones adicionales para la producción..."
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
              Crear Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrdenForm;