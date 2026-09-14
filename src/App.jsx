import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authcontext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login';

import { ProduccionLayout } from './layouts';
import { RH_layaout } from './layouts'
import { Almacen_layaout } from './layouts'
import { Mantenimiento_layaout } from './layouts'
import { Calidad_layaout } from './layouts'
import { Ventas_layaout } from './layouts'
import { Compras_layaout } from './layouts'

//Produccion
import { ProduccionDashboard } from './pages/produccion';
import { OrdenesDashboard } from './pages/produccion';
import { InvenatarioProduccionDashboard } from './pages/produccion';
import { OperadorDashboard } from './pages/produccion'
import { MaquinasDashboard} from './pages/produccion'

//RH
import { EmpleadosDashboard } from './pages/rh'
import { RHDashboard } from './pages/rh'

//Almacen
import { InventarioDashboardAlmacen } from './pages/almacen'
import { AlmacenDashboard } from './pages/almacen'

//Mantenimiento
import { MantenimientoDashboard } from './pages/mantenimiento'
import { ReporteMantenimientoDashboard } from './pages/mantenimiento'


//calidad
import { CalidadDashboard } from './pages/calidad'
import { ReporteDashboard } from './pages/calidad'
import { MetrologiaDashboard } from './pages/calidad'

//ventas
import {Cotizaciones_dashboard} from './pages/ventas'
import {StockDashboard} from './pages/ventas'

//comrpras
import { ComprasDashboard } from './pages/compras';


// Componente para redirección según el rol
const RoleRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) return <Navigate to="/" />;

    // Redirigir según el rol del usuario
    switch (user.rol) {
        case 'produccion':
            return <Navigate to="/produccion" />;
        case 'recursos_humanos':
            return <Navigate to="/rh" />;
        case 'almacen':
            return <Navigate to="/almacen" />;
        case 'mantenimiento':
            return <Navigate to="/mantenimiento" />;
        case 'calidad':
            return <Navigate to="/calidad" />;
        case 'ventas':
            return <Navigate to="/ventas" />;
        case 'compras':
            return <Navigate to="/compras" />;

        
        default:
            return <Navigate to="/" />;
    }
};

// Componente de página no autorizada
const Unauthorized = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">⛔ Acceso No Autorizado</h1>
            <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página</p>
            <a href="/" className="text-indigo-600 hover:text-indigo-800">
                Volver al Login
            </a>
        </div>
    </div>
);

// Componente helper para envolver rutas con layout
const RouteWithLayout = ({ element, layout: Layout }) => {
    return <Layout>{element}</Layout>;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Ruta de login - Pública */}
                    <Route path="/" element={<Login />} />
                    
                    {/* Ruta de redirección automática */}
                    <Route path="/dashboard" element={<RoleRedirect />} />

                    {/* ========== RUTAS DE PRODUCCIÓN ========== */}
                    <Route
                        path="/produccion"
                        element={
                           // <PrivateRoute allowedRoles={['produccion']}>
                                <ProduccionLayout>
                                    <ProduccionDashboard />
                                </ProduccionLayout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/produccion/ordenes"
                        element={
                            //<PrivateRoute allowedRoles={['produccion']}>
                                <ProduccionLayout>
                                    <OrdenesDashboard />
                                </ProduccionLayout>
                            //</PrivateRoute>
                        }
                    />
                    <Route
                        path="/produccion/inventario"
                        element={
                            //<PrivateRoute allowedRoles={['produccion']}>
                                <ProduccionLayout>
                                    <InvenatarioProduccionDashboard />
                                </ProduccionLayout>
                            //</PrivateRoute>
                        }
                    />
                    <Route
                        path="/produccion/operador"
                        element={
                           // <PrivateRoute allowedRoles={['produccion']}>
                                <ProduccionLayout>
                                    <OperadorDashboard />
                                </ProduccionLayout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/produccion/maquinas"
                        element={
                           // <PrivateRoute allowedRoles={['produccion']}>
                                <ProduccionLayout>
                                    <MaquinasDashboard />
                                </ProduccionLayout>
                           // </PrivateRoute>
                        }
                    />

                    {/* ========== RUTAS DE RECURSOS HUMANOS ========== */}
                    <Route
                        path="/rh"
                        element={
                           // <PrivateRoute allowedRoles={['recursos_humanos']}>
                                <RH_layaout>
                                    <RHDashboard />
                                </RH_layaout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/rh/empleados"
                        element={
                          //  <PrivateRoute allowedRoles={['recursos_humanos']}>
                                <RH_layaout>
                                    <EmpleadosDashboard />
                                </RH_layaout>
                          //  </PrivateRoute>
                        }
                    />

                    {/* ========== RUTAS DE ALMACÉN ========== */}
                    <Route
                        path="/almacen"
                        element={
                           // <PrivateRoute allowedRoles={['almacen']}>
                                <Almacen_layaout>
                                    <AlmacenDashboard />
                                </Almacen_layaout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/almacen/inventario"
                        element={
                           // <PrivateRoute allowedRoles={['almacen']}>
                                <Almacen_layaout>
                                    <InventarioDashboardAlmacen />
                                </Almacen_layaout>
                           // </PrivateRoute>
                        }
                    />

                    {/* ========== RUTAS DE MANTENIMIENTO ========== */}
                    <Route
                        path="/mantenimiento"
                        element={
                          //  <PrivateRoute allowedRoles={['mantenimiento']}>
                                <Mantenimiento_layaout>
                                    <MantenimientoDashboard />
                                </Mantenimiento_layaout>
                          //  </PrivateRoute>
                        }
                    />
                    <Route
                        path="/mantenimiento/reporte"
                        element={
                           // <PrivateRoute allowedRoles={['mantenimiento']}>
                                <Mantenimiento_layaout>
                                    <ReporteMantenimientoDashboard />
                                </Mantenimiento_layaout>
                           // </PrivateRoute>
                        }
                    />

                    {/* ========== RUTAS DE CALIDAD ========== */}
                    <Route
                        path="/calidad"
                        element={
                          //  <PrivateRoute allowedRoles={['calidad']}>
                                <Calidad_layaout>
                                    <CalidadDashboard />
                                </Calidad_layaout>
                          //  </PrivateRoute>
                        }
                    />
                    <Route
                        path="/calidad/reporte"
                        element={
                          //  <PrivateRoute allowedRoles={['calidad']}>
                                <Calidad_layaout>
                                    <ReporteDashboard />
                                </Calidad_layaout>
                          //  </PrivateRoute>
                        }
                    />
                    <Route
                        path="/calidad/metrologia"
                        element={
                          //  <PrivateRoute allowedRoles={['calidad']}>
                                <Calidad_layaout>
                                    <MetrologiaDashboard />
                                </Calidad_layaout>
                          //  </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ventas"
                        element={
                           // <PrivateRoute allowedRoles={['ventas']}>
                                <Ventas_layaout>
                                    <Cotizaciones_dashboard />
                                </Ventas_layaout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ventas/stock"
                        element={
                           // <PrivateRoute allowedRoles={['ventas']}>
                                <Ventas_layaout>
                                    <StockDashboard />
                                </Ventas_layaout>
                           // </PrivateRoute>
                        }
                    />
                    <Route
                        path="/compras"
                        element={
                           // <PrivateRoute allowedRoles={['compras']}>
                                <Compras_layaout>
                                    <ComprasDashboard />
                                </Compras_layaout>
                           // </PrivateRoute>
                        }
                    />
                    {/* ========== PÁGINA NO AUTORIZADO ========== */}
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* ========== REDIRECCIÓN POR DEFECTO ========== */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;