import React, { useState } from 'react';
import  MantenimientoForm from './components/mantenimientoform';
import { crearmantenimiento } from '../../services/manteniminetoService';
function ReporteMantenimientoDashboard() {
   const [showModal, setShowModal] = useState(false);

   const handleGuardarMantenimiento = async (formData) =>{
    try{
        const response = await crearmantenimiento(formData);
        if(response.success){
            alert('Mantenimiento creado exitosamente')
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
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8 text-center">
                <p className="text-gray-400 text-sm">
                    Aquí se mostrará la lista de mantenimientos
                </p>
            </div>

            <MantenimientoForm
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave = {handleGuardarMantenimiento}
            />
        </div>
    );
}

export default ReporteMantenimientoDashboard;