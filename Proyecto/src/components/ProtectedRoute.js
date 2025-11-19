import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente "envuelve" las rutas que queremos proteger
// Recibe el 'role' (ej: 'administrador') que es requerido
const ProtectedRoute = ({ role }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 1. Si no está logueado, redirige al Login
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.tipo !== role) {
    // 2. Si está logueado, PERO no tiene el rol correcto (ej: es 'cliente' intentando entrar a 'admin')
    // Lo redirigimos al inicio (o a una página de "Acceso Denegado")
    return <Navigate to="/" replace />;
  }

  // 3. Si está logueado y tiene el rol correcto,
  // renderiza el componente hijo (ej: <GestionProductos />)
  return <Outlet />;
};

export default ProtectedRoute;