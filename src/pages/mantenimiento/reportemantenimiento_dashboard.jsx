import React, { useState, useEffect} from 'react';
import  MantenimientoForm from './components/mantenimientoform';
import MantenimientoLista from './components/mantenimientolista';
import { crearmantenimiento } from '../../services/manteniminetoService';
import { mantenimientolista } from '../../services/manteniminetoService'
function ReporteMantenimientoDashboard() {
   const [showModal, setShowModal] = useState(false);
   const [mantenimientos, setMantenimientos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const cargarMantenimientos = async () => {
        try {
            setLoading(true);
            const data = await mantenimientolista();
            
            if (data.success) {
                setMantenimientos(data.data);
            }
        } catch (error) {
            setError(error.message || 'Error al cargar los mantenimientos');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        cargarMantenimientos();
    }, []);

   const handleGuardarMantenimiento = async (formData) =>{
    try{
        const response = await crearmantenimiento(formData);
        if(response.success){
            alert('Mantenimiento creado exitosamente')
            await cargarMantenimientos();

            setMantenimientos(prev => [{
            id_mantenimiento: prev.length + 1,
            ...formData
        }, ...prev]);
        }
    }catch(error){
        alert(error.message || 'Error al guardar el mantenimiento');
    }
   };

    return (
        <div className="p-6 space-y-6">
            {/* Título y botón */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">🔧 Mantenimiento</h1>
                    <p className="text-gray-400 text-sm">Gestión de mantenimientos de máquinas</p>
                </div>
                
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Mantenimiento
                </button>
            </div>

            {/* Contenido de muestra */}
            <MantenimientoLista 
                mantenimientos={mantenimientos}
                loading={loading}
                error={error}
            />

            <MantenimientoForm
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave = {handleGuardarMantenimiento}
            />
        </div>
    );
}

export default ReporteMantenimientoDashboard;