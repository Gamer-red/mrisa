import React, { useState, useEffect } from 'react';
import MaquinasAltaForm from '../../pages/produccion/components/ordenes-maquinas/maquinas_altaform';
import MaquinasLista from './components/ordenes-maquinas/maquinas_lista';
import { obtenerMaquinas } from '../../services/maquinasService';
function MaquinasDashboard() {
     const [showModal, setShowModal] = useState(false);
     const [maquinas,setMaquinas]=useState([]);
     const [loading,setLoading]=useState(true);
     const [error,setError]=useState(null);

      const cargarMaquinas = async () => {
        try {
            setLoading(true);
            const data = await obtenerMaquinas();
            
            if (data.success) {
                setMaquinas(data.data);
            }
        } catch (error) {
            setError(error.message || 'Error al cargar las máquinas');
        } finally {
            setLoading(false);
        }
    };

     useEffect(() =>{
        cargarMaquinas();
     },[]);
     
     const handleMaquinaCreada =(nuevaMaquina)=>{
        setMaquinas(prev => [nuevaMaquina,...prev]);
     };

    return (
          <div className="p-6 space-y-6">
            {/* Título y botón */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">🛠️ Máquinas</h1>
                    <p className="text-gray-400 text-sm">Gestión de máquinas de producción</p>
                </div>
                {/* Botón directamente aquí */}
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Máquina
                </button>
            </div>

             <MaquinasLista
             maquinas={maquinas}
             loading={loading}
             error={error
             }
             />
             <MaquinasAltaForm
             isOpen={showModal}
             onClose={()=>setShowModal(false)}
             onSave={handleMaquinaCreada}
             />
        </div>
    );
}

export default MaquinasDashboard;