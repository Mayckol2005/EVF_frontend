import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-bootstrap';

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };
  // Este componente solo renderiza la barra de navegación pública
  // AdminLayout se encarga de mostrar AdminNavbar.
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="https://cdn-icons-png.freepik.com/256/30/30422.png" alt="Logo Perfumería" height="40" />
          <span className="ms-2">DuocFragancias</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tienda">Tienda</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-danger fw-bold" to="/ofertas">Ofertas 🔥</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">
                Carrito
                {cartCount > 0 && (
                  <span className="badge bg-danger ms-1">{cartCount}</span>
                )}
              </NavLink>
            </li>
            {isAuthenticated && currentUser?.tipo === 'administrador' && (
              <li className="nav-item">
                <NavLink className="nav-link text-warning fw-bold" to="/admin">

                  <i className="bi bi-shield-lock-fill me-1"></i>
                  Panel Admin
                </NavLink>
              </li>
            )}
            {/* Mostrar "Ingresar" o "Cerrar Sesión" */}
            {isAuthenticated ? (
              <li className="nav-item">
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">Cerrar Sesión</Button>
              </li>
            ) : (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Ingresar</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;