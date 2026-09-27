import React, {useState, useEffect} from 'react';
import AlmacenLista from '../../../almacen/components/almacenlista';
import AlmacenFiltros from '../../../almacen/components/almacenfiltros';
import { obtenerMateriales } from '../../../../services/almacenService';


function ProduccionListaAlmacen(){
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarMateriales = async () =>{
      try{
        setLoading(true);
        const data = await obtenerMateriales();
        if (data.success){
          setMateriales(data.data)
        }
      }catch(error){
        setError(error.message || 'Error al cargar los materiales');
      } finally{
        setLoading(false);
      }
    };

    useEffect(() =>{
      cargarMateriales();
    }, []);

    return(
      <div className="p-6 space-y-6">
            {/* Título */}
            <div>
                <h1 className="text-2xl font-bold text-white">📦 Materiales</h1>
                <p className="text-gray-400 text-sm">Visualización de materiales disponibles</p>
            </div>
            <AlmacenFiltros 
          
          />
            {/* Tabla en modo solo lectura */}
            <AlmacenLista 
                materiales={materiales}
                loading={loading}
                error={error}
                soloLectura={true}
            />
        </div>
    );
}

export default ProduccionListaAlmacen;