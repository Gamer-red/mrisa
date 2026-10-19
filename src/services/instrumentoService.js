const API_URL = 'http://localhost:5000/api/instrumento';

export const crearInstrumento = async (formData) => {
    try{
        const response = await fetch (`${API_URL}/Crearinstrumento`,{
            method: 'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message || 'Error al crear instrumento');
        }
        return data;
    }catch(error){
        console.error('Error en crearInstrumento',error);
        throw error;
    }
}