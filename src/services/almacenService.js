const API_URL = 'http://localhost:5000/api/material';

export const crearMaterial = async (formData)=>{
    try{
        const response = await fetch (`${API_URL}/CrearMaterial`,{
            method: 'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || 'Error al crear el material');
        }
        return data;
    }catch(error){
        console.error('Error en crearMaterial', error);
        throw error;
    }
}

export const obtenerMateriales = async () => {
    try{
        const response = await fetch (`${API_URL}/ObtenerMateriales`,{
            method: 'GET',
            headers:{
                'Content-Type':
                'application/json'
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los materiales');
        }
         return data;
    }catch(error){

        console.error('Error en obtener los materiales:', error);
        throw error;

    }
}