import React, { useState, useEffect } from 'react';
import { 
    obtenerOrdenesOperador, 
    obtenerEmpleados,
    obtenerProcesosDisponibles
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

    const handleAbrirConfirmacion = () => {
    if (!ordenSeleccionada || !empleadoSeleccionado || !procesoSeleccionado) {
        alert('Debes seleccionar orden, empleado y proceso');
        return;
    }
    setShowModalConfirmacion(true);
};

    // ========== useEffect ==========
    
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
        <div className="p-6 space-y-6">
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
                                onClick={() => {
                                    alert('🚀 Simulación: Ejecución iniciada!\n\n📋 Orden: ' + ordenSeleccionada?.producto + '\n⚙️ Proceso: ' + procesoSeleccionado?.nombre_operacion + '\n👤 Operador: ' + empleadoSeleccionado?.nombre);
                                    setShowModalConfirmacion(false);
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