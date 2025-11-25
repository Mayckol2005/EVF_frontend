import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Navbar as BSNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import '../styles/index.css';

// Barra de navegación principal del sitio
function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BSNavbar
      expand="lg"
      variant="dark"
      className="bg-purple sticky-top shadow-sm"
      collapseOnSelect
    >
      <Container>

        {/* Logo principal */}
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.freepik.com/256/30/30422.png"
            alt="Logo Perfumería"
            height="40"
            className="me-2 rounded"
          />
          <span className="fw-bold">DuocFragancias</span>
        </BSNavbar.Brand>

        {/* Botón hamburguesa */}
        <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Contenido del menú */}
        <BSNavbar.Collapse id="responsive-navbar-nav">

          {/* Navegación principal */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/tienda">Tienda</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas" className="text-danger fw-bold">Ofertas 🔥</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* Sección derecha del menú */}
          <Nav className="align-items-lg-center">

            {/* Carrito */}
            <Nav.Link as={NavLink} to="/carrito" className="position-relative me-3">
              <i className="bi bi-cart-fill me-1"></i>
              Carrito
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Panel Admin solo si el usuario es administrador */}
            {isAuthenticated && currentUser?.tipo === 'administrador' && (
              <Nav.Link as={NavLink} to="/admin" className="text-warning fw-bold me-3">
                <i className="bi bi-shield-lock-fill me-1"></i>
                Panel Admin
              </Nav.Link>
            )}

            {/* Botones de sesión */}
            {isAuthenticated ? (
              <div className="d-flex align-items-center mt-2 mt-lg-0">
                <span className="text-white-50 me-2 d-none d-lg-inline">
                  Hola, {currentUser.nombre}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-lg-2"
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="btn btn-light text-purple fw-bold px-3 ms-lg-2 mt-2 mt-lg-0 rounded-pill"
              >
                Ingresar
              </Nav.Link>
            )}

          </Nav>
        </BSNavbar.Collapse>

      </Container>
    </BSNavbar>
  );
}

export default Navbar;
