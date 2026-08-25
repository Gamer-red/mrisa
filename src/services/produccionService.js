// services/ordenProduccionService.js

// 1. URL base de tu API
const API_URL = 'http://localhost:5000/api/produccion';

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
        const response = await fetch(`${API_URL}/produccion/orden`, {
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

// Obtener una orden por ID
export const obtenerOrdenPorId = async (id) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`http://localhost:5000/api/produccion/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener la orden');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerOrdenPorId:', error);
        throw error;
    }
};

// Obtener todas las máquinas
export const obtenerMaquinas = async () => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch('http://localhost:5000/api/maquinas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las máquinas');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerMaquinas:', error);
        throw error;
    }
};

// Crear un nuevo proceso
export const crearProceso = async (datosProceso) => {
    try {
        const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch('http://localhost:5000/api/produccion/proceso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosProceso)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el proceso');
        }

        return data;

    } catch (error) {
        console.error('Error en crearProceso:', error);
        throw error;
    }
};

// Obtener todos los procesos
export const obtenerProcesos = async (id_Orden) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
         //   throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`http://localhost:5000/api/produccion/proceso/${id_Orden}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los procesos');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerProcesos:', error);
        throw error;
    }
};

export const obtenerOrdenesOperador = async () => {
    try {
        // Obtener token del localStorage
        //const token = localStorage.getItem('token');
        
        //if (!token) {
          //  throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        // Hacer la petición GET al endpoint
        const response = await fetch(`${API_URL}/operador/ordenes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        // Convertir respuesta a JSON
        const data = await response.json();

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las órdenes disponibles');
        }

        // Retornar los datos
        return data;

    } catch (error) {
        console.error('Error en obtenerOrdenesOperador:', error);
        throw error;
    }
};

export const obtenerEmpleados = async () => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
          //  throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/empleados-operador`, {  // ← Cambia a /empleados-operador
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los empleados');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerEmpleados:', error);
        throw error;
    }
};

export const obtenerProcesosDisponibles = async (idOrden) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
            //throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
       // }

        const response = await fetch(`${API_URL}/operador/procesos/${idOrden}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los procesos disponibles');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerProcesosDisponibles:', error);
        throw error;
    }
};

export const iniciarEjecucion = async (datos) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
            //throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/iniciar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar la ejecución');
        }

        return data;

    } catch (error) {
        console.error('Error en iniciarEjecucion:', error);
        throw error;
    }
};

export const registrarProduccion = async (datos) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
            //throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar la producción');
        }

        return data;

    } catch (error) {
        console.error('Error en registrarProduccion:', error);
        throw error;
    }
};

export const pausarEjecucion = async (idEjecucion) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/pausar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_ejecucion: idEjecucion })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al pausar la ejecución');
        }

        return data;

    } catch (error) {
        console.error('Error en pausarEjecucion:', error);
        throw error;
    }
};

export const reanudarEjecucion = async (idEjecucion) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
          //  throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/reanudar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_ejecucion: idEjecucion })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al reanudar la ejecución');
        }

        return data;

    } catch (error) {
        console.error('Error en reanudarEjecucion:', error);
        throw error;
    }
};

export const terminarEjecucion = async (idEjecucion) => {
    try {
       // const token = localStorage.getItem('token');
        
        //if (!token) {
            //throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/terminar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
               // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_ejecucion: idEjecucion })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al terminar la ejecución');
        }

        return data;

    } catch (error) {
        console.error('Error en terminarEjecucion:', error);
        throw error;
    }
};

export const obtenerHistorialEjecucion = async (idEjecucion) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
          //  throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`${API_URL}/operador/historial/${idEjecucion}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
               // 'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener el historial');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerHistorialEjecucion:', error);
        throw error;
    }
};