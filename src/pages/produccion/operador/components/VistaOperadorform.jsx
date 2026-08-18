

import React, { useState, useEffect } from 'react';
import SelectorOrden from './SelectorOrden';
import SelectorEmpleado from './SelectorEmpleado';
import SelectorProceso from './SelectorProceso';
import PanelEjecucion from './PanelEjecucion';
import HistorialProduccion from './HistorialProduccion';

function ConfiguracionForm() {
  // Estados principales
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  const [ejecucionActiva, setEjecucionActiva] = useState(false);
  const [ejecucionPausada, setEjecucionPausada] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [totalPiezas, setTotalPiezas] = useState(0);
  const [totalScrap, setTotalScrap] = useState(0);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [ordenesDisponibles, setOrdenesDisponibles] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [procesosDisponibles, setProcesosDisponibles] = useState([]);

  // Funciones para cargar datos (las vamos a implementar después)
  const cargarOrdenesDisponibles = async () => { /* ... */ };
  const cargarEmpleados = async () => { /* ... */ };
  const cargarProcesos = async (idOrden) => { /* ... */ };

  // Funciones de ejecución
  const iniciarEjecucion = () => { /* ... */ };
  const pausarEjecucion = () => { /* ... */ };
  const reanudarEjecucion = () => { /* ... */ };
  const registrarLote = (piezas, scrap) => { /* ... */ };
  const terminarEjecucion = () => { /* ... */ };

  // Determinar qué secciones mostrar
  const mostrarSeleccion = !ejecucionActiva || ejecucionPausada;
  const mostrarEjecucion = ejecucionActiva && !ejecucionPausada;

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Vista Operador</h1>
          <p className="text-gray-400 text-sm">Ejecución de órdenes de producción</p>
        </div>
        <div className="text-gray-400 text-sm">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* SECCIÓN 1: Selección */}
      {mostrarSeleccion && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Seleccionar Orden</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectorOrden 
              ordenes={ordenesDisponibles}
              valorSeleccionado={ordenSeleccionada}
              onChange={setOrdenSeleccionada}
            />
            <SelectorEmpleado 
              empleados={empleados}
              valorSeleccionado={empleadoSeleccionado}
              onChange={setEmpleadoSeleccionado}
            />
            <SelectorProceso 
              procesos={procesosDisponibles}
              valorSeleccionado={procesoSeleccionado}
              onChange={setProcesoSeleccionado}
              ordenId={ordenSeleccionada?.id_orden}
            />
          </div>

          {/* Botón Iniciar */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={iniciarEjecucion}
              disabled={!ordenSeleccionada || !empleadoSeleccionado || !procesoSeleccionado}
              className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 Iniciar Ejecución
            </button>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: Ejecución Activa */}
      {mostrarEjecucion && (
        <PanelEjecucion 
          orden={ordenSeleccionada}
          empleado={empleadoSeleccionado}
          proceso={procesoSeleccionado}
          totalPiezas={totalPiezas}
          totalScrap={totalScrap}
          tiempoTranscurrido={tiempoTranscurrido}
          ejecucionPausada={ejecucionPausada}
          onPausar={pausarEjecucion}
          onReanudar={reanudarEjecucion}
          onRegistrar={registrarLote}
          onTerminar={terminarEjecucion}
        />
      )}

      {/* SECCIÓN 3: Historial */}
      {(ejecucionActiva || historial.length > 0) && (
        <HistorialProduccion 
          historial={historial}
          totalPiezas={totalPiezas}
          totalScrap={totalScrap}
        />
      )}
    </div>
  );
}

export default ConfiguracionForm;