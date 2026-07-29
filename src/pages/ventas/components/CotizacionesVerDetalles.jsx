import React, { useState } from 'react';

function CotizacionesVerDetalle({ cotizacion, onClose }) {
  // Verificar si la cotización está confirmada
  const estaConfirmada = cotizacion.confirmado === true;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">
            Detalles de Cotización {cotizacion.numero}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Número de Cotización</label>
                <p className="text-white text-sm mt-1 font-medium">{cotizacion.numero}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</label>
                <p className="text-white text-sm mt-1">{cotizacion.cliente}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</label>
                <p className="text-white text-sm mt-1">{cotizacion.fecha}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</label>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  estaConfirmada 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {estaConfirmada ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>

          {/* Productos/Servicios */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Productos/Servicios
            </h3>
            {cotizacion.items && cotizacion.items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Descripción</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dibujo/Parte</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cantidad</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {cotizacion.items.map((item) => (
                      <tr key={item.item}>
                        <td className="px-3 py-2 text-sm text-gray-300">{item.item}</td>
                        <td className="px-3 py-2 text-sm text-white">{item.descripcion}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{item.numeroDibujo || '-'}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">{item.cantidad}</td>
                        <td className="px-3 py-2 text-sm text-gray-300">${item.precioUnitario.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No hay productos/servicios registrados</p>
            )}
          </div>

          {/* Notas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Notas
            </h3>
            <p className="text-gray-300 text-sm bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              {cotizacion.notas || 'Sin notas adicionales'}
            </p>
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
export default CotizacionesVerDetalle;