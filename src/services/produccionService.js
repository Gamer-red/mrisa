// services/ordenProduccionService.js

// 1. URL base de tu API
const API_URL = 'http://localhost:5000/api';

// 2. Función principal que crea la orden
export const crearOrdenProduccion = async (formData) => {
    try {
        // 3. Obtener el token del localStorage
        //const token = localStorage.getItem('token');
        
        // 4. Verificar que existe el token
        //if (!token) {
        //    throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        console.log('URL:', `${API_URL}/orden`);
        console.log('Datos a enviar:', formData);

        // 5. Hacer la petición fetch
        const response = await fetch(`${API_URL}/orden`, {
            method: 'POST',                    // Método HTTP
            headers: {
                'Content-Type': 'application/json'//,  // Tipo de dato que envías
                //'Authorization': `Bearer ${token}`    // Token de autenticación
            },
            body: JSON.stringify(formData)     // Convierte los datos a JSON
        });

        // 6. Convertir la respuesta a JSON
        const data = await response.json();

        // 7. Verificar si la respuesta fue exitosa
        if (!response.ok) {
            // Si el backend devuelve un mensaje de error, lo usamos
            throw new Error(data.message || 'Error al crear la orden');
        }

        // 8. Retornar los datos de la respuesta
        return data;

    } catch (error) {
        // 9. Capturar y relanzar el error para manejarlo en el componente
        console.error('Error en crearOrdenProduccion:', error);
        throw error;
    }
};