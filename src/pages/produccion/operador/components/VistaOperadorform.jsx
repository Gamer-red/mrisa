import React, { useState, useEffect } from 'react';
import { 
    obtenerOrdenesOperador, 
    obtenerEmpleados,
    obtenerProcesosDisponibles,
    iniciarEjecucion,
    registrarProduccion,
    pausarEjecucion,
    reanudarEjecucion,
    terminarEjecucion
} from '../../../../services/produccionService';
import SelectorOrden from '../components/SelectorOrden';
import SelectorEmpleado from '../components/SelectorEmpleado';
import SelectorProceso from '../components/SelectorProceso';

function VistaOperador() {
    // ========== ESTADOS ==========
    const [ordenesDisponibles, setOrdenesDisponibles] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [procesosDisponibles, setProcesosDisponibles] = useState([]);
    
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [loadingProcesos, setLoadingProcesos] = useState(false);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

    const [ejecucionActiva, setEjecucionActiva] = useState(false);
    const [ejecucionPausada, setEjecucionPausada] = useState(false);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [idEjecucion, setIdEjecucion] = useState(null);
    const [totalPiezas, setTotalPiezas] = useState(0);
    const [totalScrap, setTotalScrap] = useState(0);
    const [historial, setHistorial] = useState([]);

    const [showModalPiezas, setShowModalPiezas] = useState(false);
    const [showModalScrap, setShowModalScrap] = useState(false);

    // ========== FUNCIONES ==========
    
    // Cargar órdenes disponibles
    const cargarOrdenesDisponibles = async () => {
        try {
            setLoading(true);
            console.log('🔄 Cargando órdenes...');
            const data = await obtenerOrdenesOperador();
            console.log('📥 Datos recibidos:', data);
            
            if (data.success) {
                setOrdenesDisponibles(data.data);
                console.log('✅ Órdenes disponibles:', data.data);
            }
        } catch (error) {
            console.error('Error al cargar órdenes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar empleados
    const cargarEmpleados = async () => {
        try {
            console.log('🔄 Cargando empleados...');
            const data = await obtenerEmpleados();
            console.log('📥 Empleados recibidos:', data);
            
            if (data.success) {
                setEmpleados(data.data);
                console.log('✅ Empleados disponibles:', data.data);
            }
        } catch (error) {
            console.error('Error al cargar empleados:', error);
        }
    };

    // Cargar procesos de la orden seleccionada
    const cargarProcesos = async (idOrden) => {
        try {
            setLoadingProcesos(true);
            console.log('🔄 Cargando procesos para orden:', idOrden);
            const data = await obtenerProcesosDisponibles(idOrden);
            console.log('📥 Procesos recibidos:', data);
            
            if (data.success) {
                setProcesosDisponibles(data.data);
                console.log('✅ Procesos disponibles:', data.data);
            }
        } catch (error) {
            console.error('Error al cargar procesos:', error);
            setProcesosDisponibles([]);
        } finally {
            setLoadingProcesos(false);
        }
    };

    const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
    };
        // Iniciar timer
    const iniciarTimer = () => {
        if (timerInterval) return;
        
        const interval = setInterval(() => {
            setTiempoTranscurrido(prev => prev + 1);
        }, 1000);
        
        setTimerInterval(interval);
    };

    // Detener timer
    const detenerTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    };

    // Pausar timer
    const pausarTimer = () => {
        detenerTimer();
    };

    // Reanudar timer
    const reanudarTimer = () => {
        if (!timerInterval && ejecucionActiva && !ejecucionPausada) {
            iniciarTimer();
        }
    };

    // Reiniciar timer
    const reiniciarTimer = () => {
        detenerTimer();
        setTiempoTranscurrido(0);
    };

    const handleAbrirConfirmacion = () => {
    if (!ordenSeleccionada || !empleadoSeleccionado || !procesoSeleccionado) {
        alert('Debes seleccionar orden, empleado y proceso');
        return;
    }
    setShowModalConfirmacion(true);
    };  
    // Cargar órdenes y empleados al montar el componente
    useEffect(() => {
        cargarOrdenesDisponibles();
        cargarEmpleados();
    }, []);

    // Cargar procesos cuando cambia la orden seleccionada
    useEffect(() => {
        if (ordenSeleccionada) {
            cargarProcesos(ordenSeleccionada.id_orden);
        } else {
            setProcesosDisponibles([]);
            setProcesoSeleccionado(null);
        }
    }, [ordenSeleccionada]);

    // ========== RENDER ==========
    return (
        <div className="p-6 space-y-6 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Título */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">👷 Vista Operador</h1>
                    <p className="text-gray-400 text-sm">Selecciona una orden para comenzar</p>
                </div>
                <div className="text-gray-400 text-sm">
                    {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Sección de selección */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Seleccionar Orden</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Selector de Ordenes */}
                    <SelectorOrden 
                        ordenes={ordenesDisponibles}
                        valorSeleccionado={ordenSeleccionada}
                        onChange={setOrdenSeleccionada}
                        loading={loading}
                    />

                    {/* Selector de Empleados */}
                    <SelectorEmpleado 
                        empleados={empleados}
                        valorSeleccionado={empleadoSeleccionado}
                        onChange={setEmpleadoSeleccionado}
                    />

                    {/* Selector de Procesos */}
                    <SelectorProceso 
                        procesos={procesosDisponibles}
                        valorSeleccionado={procesoSeleccionado}
                        onChange={setProcesoSeleccionado}
                        ordenId={ordenSeleccionada?.id_orden}
                        loading={loadingProcesos}
                    />
                </div>
            </div>

            {/* Mensaje de "Próximamente" para el botón */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <div className="flex justify-end">
                    <button
                        onClick={handleAbrirConfirmacion}
                        disabled={!ordenSeleccionada || !empleadoSeleccionado || !procesoSeleccionado}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Iniciar Ejecución
                    </button>
                </div>
                {ejecucionActiva && (
                    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-green-500/30 p-6">
                        
                        {/* Encabezado */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-green-400">⚡ Ejecución en Curso</h2>
                                <p className="text-sm text-gray-400">
                                    Orden #{ordenSeleccionada?.id_orden} - {ordenSeleccionada?.producto}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${ejecucionPausada ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {ejecucionPausada ? '⏸ Pausado' : '▶ En ejecución'}
                                </span>
                            </div>
                        </div>

                        {/* Contadores */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Objetivo</label>
                                <p className="text-2xl font-bold text-white">{ordenSeleccionada?.cantidad || 0}</p>
                                <p className="text-xs text-gray-500">piezas</p>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Producidas</label>
                                <p className="text-2xl font-bold text-green-400">{totalPiezas}</p>
                                <p className="text-xs text-gray-500">piezas buenas</p>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Scrap</label>
                                <p className="text-2xl font-bold text-red-400">{totalScrap}</p>
                                <p className="text-xs text-gray-500">piezas defectuosas</p>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">⏱ Tiempo</label>
                                <p className="text-2xl font-bold text-blue-400">{formatearTiempo(tiempoTranscurrido)}</p>
                                <p className="text-xs text-gray-500">tiempo efectivo</p>
                            </div>
                        </div>

                        {/* Sección de Registro de Producción */}
                        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 mb-6">
                            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">📦 Registrar Producción del Turno</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        ✅ Piezas buenas <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="piezasInput"
                                        placeholder="Ej: 10, 20, 50..."
                                        min="0"
                                        step="1"
                                        className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-green-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        ❌ Scrap
                                    </label>
                                    <input
                                        type="number"
                                        id="scrapInput"
                                        placeholder="Ej: 0, 1, 2..."
                                        min="0"
                                        step="1"
                                        className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Opcional. Registra las piezas defectuosas</p>
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    const piezasInput = document.getElementById('piezasInput');
                                    const scrapInput = document.getElementById('scrapInput');
                                    
                                    const piezas = parseInt(piezasInput.value) || 0;
                                    const scrap = parseInt(scrapInput.value) || 0;
                                    
                                    // Validar que haya al menos una pieza o scrap
                                    if (piezas === 0 && scrap === 0) {
                                        alert('Debes registrar al menos una pieza o scrap');
                                        return;
                                    }

                                    // Validar que no exceda el objetivo
                                    const objetivo = ordenSeleccionada?.cantidad || 0;
                                    if (totalPiezas + piezas > objetivo) {
                                        alert(`No puedes superar el objetivo de ${objetivo} piezas`);
                                        return;
                                    }

                                    try {
                                        // 1. Guardar en la base de datos
                                        const response = await registrarProduccion({
                                            id_ejecucion: idEjecucion,
                                            piezas: piezas,
                                            scrap: scrap
                                        });

                                        if (response.success) {
                                            // 2. Actualizar el frontend
                                            if (piezas > 0) {
                                                setTotalPiezas(prev => prev + piezas);
                                            }
                                            if (scrap > 0) {
                                                setTotalScrap(prev => prev + scrap);
                                            }

                                            // 3. Agregar al historial
                                            setHistorial(prev => [...prev, {
                                                fecha: new Date().toISOString(),
                                                piezas: piezas,
                                                scrap: scrap,
                                                accion: 'produccion'
                                            }]);

                                            // 4. Limpiar inputs
                                            piezasInput.value = '';
                                            scrapInput.value = '';

                                            console.log('✅ Producción registrada en la base de datos');
                                        }
                                    } catch (error) {
                                        console.error('❌ Error al registrar producción:', error);
                                        alert(error.message || 'Error al registrar la producción');
                                    }
                                }}
                                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Guardar piezas
                            </button>
                        </div>

                        {/* Botones de control */}
                        <div className="flex flex-wrap gap-3">
                            {!ejecucionPausada ? (
                               <button
                                onClick={async () => {
                                    try {
                                        // 1. Guardar en la base de datos
                                        const response = await pausarEjecucion(idEjecucion);
                                        
                                        if (response.success) {
                                            // 2. Actualizar el frontend
                                            pausarTimer();
                                            setEjecucionPausada(true);
                                            
                                            // 3. Agregar al historial
                                            setHistorial(prev => [...prev, {
                                                fecha: new Date().toISOString(),
                                                piezas: 0,
                                                scrap: 0,
                                                accion: 'pausa'
                                            }]);
                                            
                                            console.log('✅ Ejecución pausada en la base de datos');
                                        }
                                    } catch (error) {
                                        console.error('❌ Error al pausar:', error);
                                        alert(error.message || 'Error al pausar la ejecución');
                                    }
                                }}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                            >
                                ⏸ Pausar
                            </button>
                            ) : (
                                <button
                                onClick={async () => {
                                    try {
                                        // 1. Guardar en la base de datos
                                        const response = await reanudarEjecucion(idEjecucion);
                                        
                                        if (response.success) {
                                            // 2. Actualizar el frontend
                                            reanudarTimer();
                                            setEjecucionPausada(false);
                                            
                                            // 3. Agregar al historial
                                            setHistorial(prev => [...prev, {
                                                fecha: new Date().toISOString(),
                                                piezas: 0,
                                                scrap: 0,
                                                accion: 'reanudacion'
                                            }]);
                                            
                                            console.log('✅ Ejecución reanudada en la base de datos');
                                        }
                                    } catch (error) {
                                        console.error('❌ Error al reanudar:', error);
                                        alert(error.message || 'Error al reanudar la ejecución');
                                    }
                                }}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
                            >
                                ▶ Reanudar
                            </button>
                            )}

                            <button
                            onClick={async () => {
                                try {
                                    // 1. Guardar en la base de datos
                                    const response = await terminarEjecucion(idEjecucion);
                                    
                                    if (response.success) {
                                        // 2. Actualizar el frontend
                                        detenerTimer();
                                        setEjecucionActiva(false);
                                        setEjecucionPausada(false);
                                        
                                        // 3. Agregar al historial
                                        setHistorial(prev => [...prev, {
                                            fecha: new Date().toISOString(),
                                            piezas: 0,
                                            scrap: 0,
                                            accion: 'fin'
                                        }]);
                                        
                                        // 4. Mostrar resumen
                                        const resumen = response.data.resumen;
                                        alert(`✅ Proceso terminado!\n\n📊 Resumen:\nPiezas producidas: ${resumen.total_piezas}\nScrap: ${resumen.total_scrap}\nTiempo total: ${resumen.tiempo_total}`);
                                        
                                        console.log('✅ Ejecución terminada en la base de datos');
                                    }
                                } catch (error) {
                                    console.error('❌ Error al terminar:', error);
                                    alert(error.message || 'Error al terminar la ejecución');
                                }
                            }}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-500/25 flex items-center gap-2 ml-auto"
                        >
                            🏁 Terminar Proceso
                        </button>
                        </div>

                        {/* Historial rápido */}
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">📜 Historial</h4>
                            <div className="max-h-32 overflow-y-auto bg-slate-700/20 rounded-lg p-3">
                                {historial.length === 0 ? (
                                    <p className="text-gray-500 text-sm text-center">Sin registros</p>
                                ) : (
                                    <div className="space-y-1">
                                        {historial.slice(-10).map((item, index) => (
                                            <div key={index} className="flex justify-between text-xs">
                                                <span className="text-gray-400">{new Date(item.fecha).toLocaleTimeString()}</span>
                                                <span className="text-white">
                                                    {item.accion === 'inicio' && '🚀 Inicio'}
                                                    {item.accion === 'produccion' && (
                                                        <>
                                                            {item.piezas > 0 && `✅ ${item.piezas} piezas`}
                                                            {item.piezas > 0 && item.scrap > 0 && ' | '}
                                                            {item.scrap > 0 && `❌ ${item.scrap} scrap`}
                                                        </>
                                                    )}
                                                    {item.accion === 'pausa' && '⏸ Pausa'}
                                                    {item.accion === 'reanudacion' && '▶ Reanudación'}
                                                    {item.accion === 'fin' && '🏁 Fin'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Mensaje de validación */}
                {(!ordenSeleccionada || !empleadoSeleccionado || !procesoSeleccionado) && (
                    <p className="text-yellow-400 text-sm mt-3 text-center">
                        ⚠️ Selecciona orden, empleado y proceso para habilitar el botón
                    </p>
                )}
            </div>

                {showModalConfirmacion && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-md p-6 shadow-2xl">
                    
                    <div className="text-center">
                        {/* Icono */}
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">Iniciar Ejecución</h3>
                        <p className="text-gray-400 text-sm mb-4">¿Estás seguro de que quieres iniciar este proceso?</p>
                        
                        {/* Resumen de la selección */}
                        <div className="bg-slate-700/30 rounded-lg p-4 mb-6 text-left space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Orden:</span>
                                <span className="text-white text-sm font-medium">#{ordenSeleccionada?.id_orden} - {ordenSeleccionada?.producto}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Proceso:</span>
                                <span className="text-white text-sm font-medium">{procesoSeleccionado?.nombre_operacion}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Operador:</span>
                                <span className="text-white text-sm font-medium">{empleadoSeleccionado?.nombre}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Objetivo:</span>
                                <span className="text-white text-sm font-medium">{ordenSeleccionada?.cantidad} piezas</span>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModalConfirmacion(false)}
                                className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={async () => {
                                     console.log('🟢 Botón clickeado - iniciarEjecucion importada');
                                    try {
                                        setShowModalConfirmacion(false);
                                        
                                        const datos = {
                                            id_orden: ordenSeleccionada.id_orden,
                                            id_proceso: procesoSeleccionado.id_proceso,
                                            id_empleado: empleadoSeleccionado.id_empleado
                                        };
                                        
                                        console.log('📤 Enviando datos:', datos);
                                        
                                        const response = await iniciarEjecucion(datos);
                                        
                                        console.log('📥 Respuesta del backend:', response);
                                        console.log('📥 Tipo de respuesta:', typeof response);
                                        console.log('📥 Response success:', response?.success);
                                        
                                        if (response && response.success) {
                                            console.log('✅ Ejecución exitosa, ID:', response.data.id_ejecucion);
                                                                                 
                                            setIdEjecucion(response.data.id_ejecucion);                                       
                                            setEjecucionActiva(true);
                                            setEjecucionPausada(false);
                                            setTotalPiezas(0);
                                            setTotalScrap(0);
                                            setHistorial([]);
                                            reiniciarTimer();
                                            iniciarTimer();
                                            
                                            setHistorial([{
                                                fecha: new Date().toISOString(),
                                                piezas: 0,
                                                scrap: 0,
                                                accion: 'inicio'
                                            }]);
                                        }else {
                                            console.log('⚠️ Respuesta sin éxito:', response);
                                        }
                                    } catch (error) {
                                        console.error('❌ Error:', error);
                                    }
                                }}

                                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-green-500/25"
                            >
                                Confirmar Inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default VistaOperador;