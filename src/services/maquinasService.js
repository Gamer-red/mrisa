const API_URL = 'http://localhost:5000/api/maquinas';

export const crearMaquina = async (formData) => {
    try{
        const response = await fetch (`${API_URL}/maquinas`,{
            method: 'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message || 'Error al crear las maquinas');
        }
        return data;
    }catch(error){
        console.error('Error en crearmaquina',error);
        throw error;
    }
}

export const obtenerMaquinas = async () =>{
    try{
        const response = await fetch(`${API_URL}/maquinas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || 'Error al obtener las maquinas');
        }
        return data;
    }catch(error){
        console.error('Error en obtenerMaquinas',error)
        throw error;
    }
}