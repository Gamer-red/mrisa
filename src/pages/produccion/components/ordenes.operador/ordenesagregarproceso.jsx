import React, { useState, useEffect } from 'react';
import { obtenerMaquinas, crearProceso} from '../../../../services/produccionService';

function ModalAgregarProceso({ isOpen, onClose, onSave, idOrden }) {
  const [maquinas, setMaquinas] = useState([]);
  const [loadingMaquinas, setLoadingMaquinas] = useState(true);
  const [guardando, setGuardando] = useState(false);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre_operacion: '',
    tipo_proceso: '',
    id_maquina: '',
    tiempo_estimado: '',
    notas: ''
  });

  // Cargar máquinas cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      cargarMaquinas();
      // Resetear formulario al abrir
      setFormData({
        nombre_operacion: '',
        tipo_proceso: '',
        id_maquina: '',
        tiempo_estimado: '',
        notas: ''
      });
    }
  }, [isOpen]);

  const cargarMaquinas = async () => {
    try {
      setLoadingMaquinas(true);
      const data = await obtenerMaquinas();
      if (data.success) {
        setMaquinas(data.data);
      }
    } catch (error) {
      console.error('Error al cargar máquinas:', error);
    } finally {
      setLoadingMaquinas(false);
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar proceso
  const handleGuardar = async () => {
    try {
      setGuardando(true);
      
      // Validar campos obligatorios
      if (!formData.nombre_operacion || !formData.tipo_proceso || !formData.id_maquina || !formData.tiempo_estimado) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      // Preparar datos para enviar
      const datosEnviar = {
        ...formData,
        id_orden: idOrden, // Agregar el ID de la orden
        tiempo_estimado: parseFloat(formData.tiempo_estimado) // Convertir a número
      };

      const resultado = await crearProceso(datosEnviar);
      
      if (resultado.success) {
        // Éxito
        if (onSave) {
          onSave(resultado.data); // Notificar al componente padre
        }
        onClose(); // Cerrar modal
      }
    } catch (error) {
      alert(error.message || 'Error al guardar el proceso');
    } finally {
      setGuardando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 flex-shrink-0">
          <h3 className="text-xl font-bold text-white">Agregar Proceso</h3>
          <p className="text-sm text-gray-400 mt-1">Completa los datos del nuevo proceso</p>
        </div>

        {/* Cuerpo */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Nombre de la operación */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre de la operación <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nombre_operacion"
                value={formData.nombre_operacion}
                onChange={handleChange}
                placeholder="Ej: Corte, Taladrado, Pintura..."
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Tipo de proceso */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de proceso <span className="text-red-400">*</span>
              </label>
              <select
                name="tipo_proceso"
                value={formData.tipo_proceso}
                onChange={handleChange}
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Selecciona un tipo</option>
                <option value="mecanizado">Mecanizado</option>
                <option value="fundicion">Fundición</option>
                <option value="forjado">Forjado</option>
                <option value="tratamiento_termico">Tratamiento Térmico</option>
                <option value="pintura">Pintura</option>
                <option value="ensamblaje">Ensamblaje</option>
                <option value="control_calidad">Control de Calidad</option>
              </select>
            </div>

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
                <option value="">Selecciona una máquina</option>
                {loadingMaquinas ? (
                  <option value="" disabled>Cargando máquinas...</option>
                ) : (
                  maquinas.map((maquina) => (
                    <option key={maquina.id_maquina} value={maquina.id_maquina}>
                      {maquina.nombre}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Tiempo estimado */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tiempo estimado (horas) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="tiempo_estimado"
                value={formData.tiempo_estimado}
                onChange={handleChange}
                placeholder="Ej: 1.5, 2, 3.5..."
                min="0"
                step="0.5"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-xs text-gray-500 mt-1">Usa decimales para medias horas (ej: 1.5, 2.5)</p>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notas
              </label>
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                placeholder="Observaciones adicionales del proceso..."
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
            disabled={guardando}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {guardando ? 'Guardando...' : 'Guardar Proceso'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarProceso;