import React, { useState } from 'react';
import CotizacionItemForm from './CotizacionItemForm';

function CotizacionForm({ onClose, onSubmit, cotizacionEditar }) {
  // Estado para los datos generales
  const [formData, setFormData] = useState({
    numero: cotizacionEditar?.numero || `COT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    fecha: cotizacionEditar?.fecha || new Date().toISOString().split('T')[0],
    cliente: cotizacionEditar?.cliente || '',
    notas: cotizacionEditar?.notas || ''
  });

  // Estado para los items
  const [items, setItems] = useState(cotizacionEditar?.items || []);
  const [itemEditando, setItemEditando] = useState(null);

  // Opciones para el listbox de clientes (ejemplo)
  const opcionesClientes = [
    'Seleccionar cliente...',
    'Cliente A',
    'Cliente B',
    'Cliente C',
    'Cliente D',
    'Cliente E'
  ];

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar o actualizar item
  const handleAddItem = (itemData) => {
    if (itemEditando) {
      // Actualizar item existente
      setItems(prev => prev.map(item => 
        item.item === itemEditando.item ? { ...itemData, item: itemEditando.item } : item
      ));
      setItemEditando(null);
    } else {
      // Agregar nuevo item con número de item auto-generado
      const nuevoItem = {
        ...itemData,
        item: items.length + 1
      };
      setItems(prev => [...prev, nuevoItem]);
    }
  };

  // Editar item
  const handleEditItem = (item) => {
    setItemEditando(item);
  };

  // Eliminar item
  const handleDeleteItem = (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar este item?')) {
      setItems(prev => prev.filter(item => item.item !== itemId));
      // Re-numerar items
      setItems(prev => prev.map((item, index) => ({
        ...item,
        item: index + 1
      })));
    }
  };

  // Cancelar edición de item
  const handleCancelEdit = () => {
    setItemEditando(null);
  };

  // Manejar envío del formulario completo
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que el cliente no sea el placeholder
    if (formData.cliente === 'Seleccionar cliente...' || formData.cliente === '') {
      alert('Por favor seleccione un cliente');
      return;
    }

    // Validar que haya al menos un item
    if (items.length === 0) {
      alert('Agregue al menos un producto/servicio');
      return;
    }

    // Enviar datos completos al padre
    if (onSubmit) {
      onSubmit({
        ...formData,
        items: items,
        confirmado: cotizacionEditar?.confirmado || false
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">
            {cotizacionEditar ? 'Editar Cotización' : 'Nueva Cotización'}
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
          {/* Sección 1: Datos Generales */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Datos Generales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Número de Cotización (auto-generado) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Número de Cotización <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">* Auto-generado</p>
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

              {/* Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cliente <span className="text-red-400">*</span>
                </label>
                <select
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  {opcionesClientes.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sección 2: Productos/Servicios */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Productos/Servicios
            </h3>
            
            {/* Formulario de items */}
            <CotizacionItemForm 
              onAddItem={handleAddItem}
              itemEditando={itemEditando}
              onCancelEdit={handleCancelEdit}
            />

            {/* Tabla de items agregados */}
            {items.length > 0 && (
              <div className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Descripción</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dibujo/Parte</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cantidad</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Precio</th>
                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {items.map((item) => (
                        <tr key={item.item} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">{item.item}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{item.descripcion}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{item.numeroDibujo || '-'}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{item.cantidad}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">${item.precioUnitario.toFixed(2)}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              {/* Botón Editar */}
                              <button
                                type="button"
                                onClick={() => handleEditItem(item)}
                                className="p-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 transition-colors"
                                title="Editar item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.item)}
                                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                                title="Eliminar item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sección 3: Notas */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Notas
            </h3>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows="4"
              placeholder="Vigencia, condiciones de pago, instrucciones adicionales..."
              className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-700">
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
              {cotizacionEditar ? 'Actualizar Cotización' : 'Guardar Cotización'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CotizacionForm;