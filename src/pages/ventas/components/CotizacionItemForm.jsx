import React, { useState } from 'react';

function CotizacionItemForm({ onAddItem, itemEditando, onCancelEdit }) {
  // Estado para los campos del item
  const [itemData, setItemData] = useState({
    descripcion: itemEditando?.descripcion || '',
    numeroDibujo: itemEditando?.numeroDibujo || '',
    cantidad: itemEditando?.cantidad || '',
    precioUnitario: itemEditando?.precioUnitario || '',
    observaciones: itemEditando?.observaciones || ''
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del item
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!itemData.descripcion.trim()) {
      alert('La descripción es requerida');
      return;
    }
    if (!itemData.cantidad || parseFloat(itemData.cantidad) <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }
    if (!itemData.precioUnitario || parseFloat(itemData.precioUnitario) <= 0) {
      alert('El precio unitario debe ser mayor a 0');
      return;
    }

    // Enviar item al padre
    if (onAddItem) {
      onAddItem({
        ...itemData,
        cantidad: parseFloat(itemData.cantidad),
        precioUnitario: parseFloat(itemData.precioUnitario)
      });
    }

    // Limpiar el formulario si es un nuevo item
    if (!itemEditando) {
      setItemData({
        descripcion: '',
        numeroDibujo: '',
        cantidad: '',
        precioUnitario: '',
        observaciones: ''
      });
    } else {
      // Si estaba editando, limpiar y salir del modo edición
      onCancelEdit();
      setItemData({
        descripcion: '',
        numeroDibujo: '',
        cantidad: '',
        precioUnitario: '',
        observaciones: ''
      });
    }
  };

  // Manejar cancelación de edición
  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
      setItemData({
        descripcion: '',
        numeroDibujo: '',
        cantidad: '',
        precioUnitario: '',
        observaciones: ''
      });
    }
  };

  return (
    <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descripción <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="descripcion"
            value={itemData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Engranaje Tipo A"
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        {/* Número de Dibujo/Parte */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Número de Dibujo/Parte
          </label>
          <input
            type="text"
            name="numeroDibujo"
            value={itemData.numeroDibujo}
            onChange={handleChange}
            placeholder="Ej: DIB-001"
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Cantidad */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cantidad <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            name="cantidad"
            value={itemData.cantidad}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1"
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
        </div>

        {/* Precio Unitario */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Precio Unitario <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
            <input
              type="number"
              name="precioUnitario"
              value={itemData.precioUnitario}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-slate-700/50 text-white pl-8 pr-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
        </div>

        {/* Observaciones */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Observaciones
          </label>
          <input
            type="text"
            name="observaciones"
            value={itemData.observaciones}
            onChange={handleChange}
            placeholder="Observaciones adicionales del item..."
            className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 mt-4">
        {itemEditando && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 bg-slate-600/50 hover:bg-slate-500/50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Cancelar Edición
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {itemEditando ? 'Actualizar Item' : 'Agregar Item'}
        </button>
      </div>
    </div>
  );
}

export default CotizacionItemForm;