import React, { useState } from 'react';

function CotizacionFiltros({ onFilterChange }) {
  const [filtroAceptado, setFiltroAceptado] = useState('todos');
  const [filtroCliente, setFiltroCliente] = useState('todos');
  const [filtroFecha, setFiltroFecha] = useState('');

  // Opciones de clientes (ejemplo)
  const opcionesClientes = [
    'todos',
    'Cliente A',
    'Cliente B',
    'Cliente C',
    'Cliente D',
    'Cliente E'
  ];

  // Manejar cambio en filtro de aceptado
  const handleFiltroAceptadoChange = (e) => {
    const valor = e.target.value;
    setFiltroAceptado(valor);
    aplicarFiltros(valor, filtroCliente, filtroFecha);
  };

  // Manejar cambio en filtro de cliente
  const handleFiltroClienteChange = (e) => {
    const valor = e.target.value;
    setFiltroCliente(valor);
    aplicarFiltros(filtroAceptado, valor, filtroFecha);
  };

  // Manejar cambio en filtro de fecha
  const handleFiltroFechaChange = (e) => {
    const valor = e.target.value;
    setFiltroFecha(valor);
    aplicarFiltros(filtroAceptado, filtroCliente, valor);
  };

  // Aplicar todos los filtros
  const aplicarFiltros = (aceptado, cliente, fecha) => {
    if (onFilterChange) {
      onFilterChange({
        aceptado,
        cliente,
        fecha
      });
    }
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setFiltroAceptado('todos');
    setFiltroCliente('todos');
    setFiltroFecha('');
    if (onFilterChange) {
      onFilterChange({
        aceptado: 'todos',
        cliente: 'todos',
        fecha: ''
      });
    }
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4 flex-shrink-0">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Filtro de Aceptado */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Estado
          </label>
          <select
            value={filtroAceptado}
            onChange={handleFiltroAceptadoChange}
            className="w-full bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmado">Confirmados</option>
          </select>
        </div>

        {/* Filtro de Cliente */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Cliente
          </label>
          <select
            value={filtroCliente}
            onChange={handleFiltroClienteChange}
            className="w-full bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          >
            {opcionesClientes.map((cliente, index) => (
              <option key={index} value={cliente}>
                {cliente === 'todos' ? 'Todos los clientes' : cliente}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Fecha */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={filtroFecha}
            onChange={handleFiltroFechaChange}
            className="w-full bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
        </div>

        {/* Botón Limpiar */}
        <div className="flex-shrink-0">
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CotizacionFiltros;