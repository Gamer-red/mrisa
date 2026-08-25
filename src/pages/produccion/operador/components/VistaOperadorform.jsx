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
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 text-center">
                <p className="text-gray-400 text-sm">
                    ⏳ Próximamente: Iniciar Ejecución, Timer, Registro de Producción...
                </p>
            </div>
        </div>
    );
}

export default VistaOperador;