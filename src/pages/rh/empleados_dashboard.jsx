import React, { useState } from 'react';
import EmpleadoForm from '../rh/empleadosform';

function EmpleadosDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Datos de ejemplo de empleados - SOLO DATOS BÁSICOS
  const empleados = [
    {
      id: 1,
      nombre: 'María García López',
      puesto: 'Operador CNC',
      departamento: 'Producción',
      telefono: '555-1234',
      correo: 'maria.garcia@empresa.com',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Juan Pérez Ramírez',
      puesto: 'Coordinador de RH',
      departamento: 'Recursos Humanos',
      telefono: '555-5678',
      correo: 'juan.perez@empresa.com',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Ana Martínez Soto',
      puesto: 'Supervisor de Producción',
      departamento: 'Producción',
      telefono: '555-9012',
      correo: 'ana.martinez@empresa.com',
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Carlos López Hernández',
      puesto: 'Operador de Maquinaria',
      departamento: 'Producción',
      telefono: '555-3456',
      correo: 'carlos.lopez@empresa.com',
      estado: 'Inactivo'
    },
    {
      id: 5,
      nombre: 'Laura Rodríguez Díaz',
      puesto: 'Asistente de RH',
      departamento: 'Recursos Humanos',
      telefono: '555-7890',
      correo: 'laura.rodriguez@empresa.com',
      estado: 'Activo'
    }
  ];

  // Función para manejar el click del botón
  const handleAgregarEmpleadoClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    console.log('Nuevo empleado registrado:', data);
    setMostrarFormulario(false);
  };

  // Funciones para los botones de acción
  const handleVer = (empleado) => {
    console.log('Ver empleado:', empleado);
  };

  const handleModificar = (empleado) => {
    console.log('Modificar empleado:', empleado);
  };

  const handleEliminar = (empleado) => {
    console.log('Eliminar empleado:', empleado);
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    return estado === 'Activo' 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Recursos Humanos</h1>
        
        <button 
          onClick={handleAgregarEmpleadoClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Agregar Empleado
        </button>
      </div>

      {/* Tabla de empleados con scroll horizontal y vertical */}
      <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-auto">
          <div className="min-w-max">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">No.</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Nombre</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Puesto</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Departamento</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Teléfono</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Correo</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {empleados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">{empleado.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{empleado.nombre}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{empleado.puesto}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{empleado.departamento}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{empleado.telefono}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{empleado.correo}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(empleado.estado)}`}>
                        {empleado.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {/* Botón Ver */}
                        <button
                          onClick={() => handleVer(empleado)}
                          className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-colors"
                          title="Ver detalles"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* Botón Modificar */}
                        <button
                          onClick={() => handleModificar(empleado)}
                          className="p-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 transition-colors"
                          title="Modificar empleado"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Botón Eliminar */}
                        <button
                          onClick={() => handleEliminar(empleado)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                          title="Eliminar empleado"
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
      </div>

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <EmpleadoForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default EmpleadosDashboard;