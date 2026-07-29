import React, { useState } from 'react';
import MaterialItems from './produccionordenesitems';

function Produccionordeneslista() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Datos de ejemplo
  const materiales = [
    { 
      id: 1, 
      codigo: 'MAT-001', 
      material: 'Acero Inoxidable 304', 
      tipo: 'Materia Prima',
      cantidadMaterial: '500 kg',
      ruta: 'Almacén A-1',
      stock: '450 kg',
      costoUnitario: '$2.50',
      estado: 'Disponible'
    },
    { 
      id: 2, 
      codigo: 'MAT-002', 
      material: 'Perno Hexagonal M8', 
      tipo: 'Insumo',
      cantidadMaterial: '1000 uds',
      ruta: 'Almacén B-3',
      stock: '850 uds',
      costoUnitario: '$0.75',
      estado: 'Disponible'
    },
    { 
      id: 3, 
      codigo: 'MAT-003', 
      material: 'Pintura Epóxica', 
      tipo: 'Proceso Terminado',
      cantidadMaterial: '200 L',
      ruta: 'Almacén C-2',
      stock: '150 L',
      costoUnitario: '$15.00',
      estado: 'En Proceso'
    },
    { 
      id: 4, 
      codigo: 'MAT-004', 
      material: 'Taladro Eléctrico', 
      tipo: 'Herramienta',
      cantidadMaterial: '15 uds',
      ruta: 'Taller Principal',
      stock: '12 uds',
      costoUnitario: '$120.00',
      estado: 'Disponible'
    },
    { 
      id: 5, 
      codigo: 'MAT-005', 
      material: 'Plástico ABS', 
      tipo: 'Materia Prima',
      cantidadMaterial: '300 kg',
      ruta: 'Almacén A-2',
      stock: '280 kg',
      costoUnitario: '$3.20',
      estado: 'Bajo Stock'
    },
    { 
      id: 6, 
      codigo: 'MAT-006', 
      material: 'Sensor de Temperatura', 
      tipo: 'Fabricable',
      cantidadMaterial: '50 uds',
      ruta: 'Línea Producción',
      stock: '45 uds',
      costoUnitario: '$25.00',
      estado: 'Disponible'
    },
  ];

  // Filtros disponibles
  const filtros = [
    'todos',
    'materia prima',
    'en proceso',
    'proceso terminado',
    'herramienta',
    'insumo',
    'fabricables'
  ];

  // Filtrar materiales según búsqueda y categoría
  const materialesFiltrados = materiales.filter(material => {
    const coincideBusqueda = 
      material.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const coincideFiltro = 
      filtroActivo === 'todos' || 
      material.tipo.toLowerCase() === filtroActivo.toLowerCase();
    
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Título */}
      <h2 className="text-2xl font-bold text-white flex-shrink-0">Inventario</h2>

      {/* Filtros y Búsqueda - Separados completamente */}
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex-shrink-0">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Buscar por código, material o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Filtro de categoría */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Categoría:</span>
            <select
              value={filtroActivo}
              onChange={(e) => setFiltroActivo(e.target.value)}
              className="bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="todos">Todos</option>
              <option value="materia prima">Materia Prima</option>
              <option value="en proceso">En Proceso</option>
              <option value="proceso terminado">Proceso Terminado</option>
              <option value="herramienta">Herramienta</option>
              <option value="insumo">Insumo</option>
              <option value="fabricables">Fabricables</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla con scroll vertical Y horizontal */}
      <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-auto">
          <div className="min-w-max">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-800/90 backdrop-blur z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Código</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Material/Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Cantidad Material</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Ruta</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Costo Unitario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {materialesFiltrados.length > 0 ? (
                  materialesFiltrados.map((material) => (
                    <MaterialItems key={material.id} material={material} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                      No se encontraron materiales
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Contador de resultados */}
        <div className="px-4 py-3 border-t border-slate-700/50 flex-shrink-0">
          <span className="text-sm text-gray-400">
            Mostrando {materialesFiltrados.length} de {materiales.length} materiales
          </span>
        </div>
      </div>
    </div>
  );
}

export default Produccionordeneslista;