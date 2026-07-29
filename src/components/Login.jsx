import React, { useState } from 'react'; // ✅ Importar useState
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext'; // ✅ Verifica que la ruta sea correcta

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones básicas
        if (!correo || !contrasenia) {
            setError('Por favor, completa todos los campos');
            setLoading(false);
            return;
        }

        try {
            const result = await login(correo, contrasenia);
            
            if (result.success) {
                // Redirigir según el rol
                const rol = result.usuario.rol;
                if (rol === 'produccion') {
                    navigate('/produccion');
                } else if (rol === 'recursos_humanos') {
                    navigate('/rh');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(result.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
            console.error('Error en login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white rounded-3xl px-10 py-10 shadow-md w-[420px]'>
                <h1 className='text-3xl font-semibold text-center'>
                    MRYSA de C.V
                </h1>

                <p className='font-medium text-sm mt-4 text-center'>
                    Sistema ERP - Manufactura de CNC
                </p>

                {/* ✅ Mostrar mensaje de error */}
                {error && (
                    <div className='mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm'>
                        {error}
                    </div>
                )}

                {/* ✅ Agregar onSubmit al formulario */}
                <form onSubmit={handleSubmit} className='mt-6'>
                    {/* Email */}
                    <div>
                        <label className='block text-lg font-medium mb-2'>
                            Email
                        </label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder='Ingresa el correo del departamento'
                            className='w-full border-2 border-gray-100 rounded-xl p-2 outline-none focus:border-blue-500'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Contraseña */}
                    <div className='mt-5'>
                        <label className='block text-lg font-medium mb-2'>
                            Contraseña
                        </label>
                        <input
                            id="contrasenia"
                            name="contrasenia"
                            type='password'
                            placeholder='Ingresa la contraseña'
                            required
                            className='w-full border-2 border-gray-100 rounded-xl p-2 outline-none focus:border-blue-500'
                            value={contrasenia}
                            onChange={(e) => setContrasenia(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Botón */}
                    <div className='mt-6'>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full active:scale-[.97] active:duration-75 hover:scale-[1.02]
                            transition-all py-3 text-white text-lg font-bold rounded-xl
                            ${loading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-800 hover:bg-blue-900'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Iniciando sesión...
                                </span>
                            ) : (
                                'Ingresar'
                            )}
                        </button>
                    </div>

                    {/* Credenciales de prueba */}
                    <div className='mt-4 text-xs text-center text-gray-500'>
                        <p>Credenciales de prueba:</p>
                        <p>produccion@mrysa.com / produccion</p>
                        <p>rh@mrysa.com / recursos humanos</p>
                    </div>
                </form>
            </div>
        </div>
    );
}