
const API_URL = 'http://localhost:5000/api/mantenimiento';

export const crearmantenimiento = async (formData) =>{
    try{
        const response = await fetch (`${API_URL}/Crearmantenimiento`, {
            method: 'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();

        if(!response.ok){
            throw new Error (data.message || 'Error al crear las maquinas');
        }
        return data;
    }catch(error){
         console.error('Error en crear mantenimeinto',error);
        throw error;
    }
}

export const mantenimientolista = async (formData) => {
    try{
        const response = await fetch (`${API_URL}/MantenimientoLista`,{
            method: 'GET',
            headers :{
                'Content-Type':
                'application/json'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los mantenimientos');
        }

        return data;
    }catch(error){
        console.error('Error en obtener los mantenimeintos:', error);
        throw error;
    }
}