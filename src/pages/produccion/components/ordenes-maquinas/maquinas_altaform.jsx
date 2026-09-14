import React, { useState, useEffect } from 'react';
import { crearMaquina } from '../../../../services/maquinasService';

function MaquinasAltaForm({ isOpen, onClose,onSave }) {
    const [formData, setFormData] = useState({
        nombre:'',
        tipo:'',
        estado_operativo:'ACTIVA',
        notas:''
    });

    const [guardando, setGuardando] = useState(false);
    useEffect(()=>{
        if(isOpen){
            setFormData({
                nombre: '',
                tipo: '',
                estado_operativo: 'ACTIVA',
                notas:''
            });
        }
    },[isOpen]);
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardar = async ()=>{
        try{
            setGuardando(true);
            if(!formData.nombre || !formData.tipo){
                alert('Por favor completa los campos obligatorios');
                return;
            }
            const response = await crearMaquina(formData);
            if(response.sucess){
                alert('Maquina creada exitosamente');
                if (onSave) {
                    onSave(response.data);
                }
                onClose();
            }
        }catch(error){
            alert(error.message || 'Error al guardar la maquina');
        } finally{
            setGuardando(false);
        }
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">🛠️ Agregar Máquina</h3>
                            <p className="text-sm text-gray-400 mt-1">Completa los datos de la nueva máquina</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Cuerpo */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-4">
                        
                        {/* Nombre de la máquina */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nombre de la máquina <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej: CNC-01, Torno-02, Fresa-03..."
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Tipo de máquina */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                tipo de maquina <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Estado operativo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Estado operativo <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="estado operativo"
                                value={formData.estado_operativo}
                                onChange={handleChange}
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="ACTIVA">✅ Activa</option>
                                <option value="EN_MANTENIMIENTO">🔧 En Mantenimiento</option>
                                <option value="INACTIVA">❌ Inactiva</option>
                            </select>
                        </div>

                        {/* Notas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Notas / Observaciones
                            </label>
                            <textarea
                                name="notas"
                                value={formData.notas}
                                onChange={handleChange}
                                placeholder="Observaciones adicionales de la máquina..."
                                rows="4"
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700/50 flex-shrink-0 flex justify-end gap-3 bg-slate-800/95 rounded-b-2xl">
                    <button
                        onClick={onclose}
                        disabled={guardando}
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                    onClick={handleGuardar}
                    disabled={guardando}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25"
                    >
                        Guardar Máquina
                    </button>
                </div>

            </div>
        </div>
    );
}

export default MaquinasAltaForm;