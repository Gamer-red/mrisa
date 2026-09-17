import React, { useState, useEffect} from 'react';
import { obtenerMaquinas } from '../../../services/maquinasService'
import { crearmantenimiento } from '../../../services/manteniminetoService'
function MantenimientoForm({ isOpen, onClose, onSave  }) {
    const [maquinas, setMaquinas]= useState([]);
    const [loadingMaquinas, setLoadingMaquinas] = useState(true);
    const [guardando,setGuardando] = useState(false);
    const [formData, setFormData] = useState({
      id_maquina: '',
        tipo: '',
        frecuencia: '',
        descripcion: '',
        fecha: '',
        costo: '',
        notas: ''
    })

     useEffect(() => {
        if (isOpen) {
            cargarMaquinas();
            setFormData({
                id_maquina: '',
                tipo: '',
                frecuencia: '',
                descripcion: '',
                fecha: '',
                costo: '',
                notas: ''
            });
        }
    }, [isOpen]);

    const cargarMaquinas = async () => {
      try{
          setLoadingMaquinas(true);
          const data = await obtenerMaquinas();

          if(data.success){
            setMaquinas(data.data)
          }
      }catch(error){
        console.error('Error al cargar las maquinas:', error);
      }finally{
        setLoadingMaquinas(false);
      }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardar = async () => {
    try {
        setGuardando(true);
        
        if (!formData.id_maquina || !formData.tipo || !formData.frecuencia || !formData.descripcion || !formData.fecha) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        
        if (onSave) {
            await onSave(formData);
        }
        
        onClose(); // ← FALTA ESTO
        
    } catch (error) {
        alert(error.message || 'Error al guardar el mantenimiento');
    } finally {
        setGuardando(false);
    }
};

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">🔧 Agregar Mantenimiento</h3>
                            <p className="text-sm text-gray-400 mt-1">Completa los datos del mantenimiento</p>
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
                        
                        {/* Máquina */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Máquina <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="id_maquina"
                                value={formData.id_maquina}
                                onChange={handleChange}
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                 <option value="">
                                    {loadingMaquinas ? 'Cargando máquinas...' : 'Selecciona una máquina'}
                                </option>
                                  {maquinas.map((maquina) => (
                                    <option key={maquina.id_maquina} value={maquina.id_maquina}>
                                        {maquina.nombre} - {maquina.tipo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tipo de mantenimiento */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tipo de mantenimiento <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                placeholder="Ej: Preventivo, Correctivo, Predictivo..."
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Frecuencia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Frecuencia <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="frecuencia"
                                value={formData.frecuencia}
                                onChange={handleChange}
                                placeholder="Ej: Mensual, Trimestral, Anual..."
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Descripción <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción del mantenimiento..."
                                rows="3"
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Fecha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Fecha <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Costo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Costo
                            </label>
                            <input
                                name="costo"
                                value={formData.costo}
                                onChange={handleChange}
                                placeholder="Ej: 1500.00"
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
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
                                placeholder="Observaciones adicionales..."
                                rows="3"
                                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700/50 flex-shrink-0 flex justify-end gap-3 bg-slate-800/95 rounded-b-2xl">
                    <button                      
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGuardar}
                        disabled={guardando}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25"
                    >
                        Guardar Mantenimiento
                    </button>
                </div>

            </div>
        </div>
    );
}

export default MantenimientoForm;