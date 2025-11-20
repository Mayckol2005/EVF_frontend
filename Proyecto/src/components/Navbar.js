import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// Importamos los componentes de React-Bootstrap
import { Navbar as BSNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import '../styles/index.css'; // Aseguramos que los estilos globales estén aquí

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // expand="lg": Colapsa en pantallas menores a lg (celulares/tablets)
    // collapseOnSelect: Cierra el menú automáticamente al hacer clic en un link
    <BSNavbar expand="lg" variant="dark" className="bg-purple sticky-top shadow-sm" collapseOnSelect>
      <Container>
        
        {/* Marca / Logo */}
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="https://cdn-icons-png.freepik.com/256/30/30422.png" 
            alt="Logo Perfumería" 
            height="40" 
            className="me-2 rounded"
          />
          <span className="fw-bold">DuocFragancias</span>
        </BSNavbar.Brand>

        {/* Botón Hamburguesa (Toggle) */}
        <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Contenido Colapsable */}
        <BSNavbar.Collapse id="responsive-navbar-nav">
          
          {/* Menú Izquierdo (Enlaces principales) */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/tienda">Tienda</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas" className="text-danger fw-bold">Ofertas 🔥</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* Menú Derecho (Carrito, Admin, Login) */}
          <Nav className="align-items-lg-center">
            
            {/* Enlace Carrito */}
            <Nav.Link as={NavLink} to="/carrito" className="position-relative me-3">
              <i className="bi bi-cart-fill me-1"></i> Carrito
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Panel Admin (Solo si es admin) */}
            {isAuthenticated && currentUser?.tipo === 'administrador' && (
              <Nav.Link as={NavLink} to="/admin" className="text-warning fw-bold me-3">
                <i className="bi bi-shield-lock-fill me-1"></i>
                Panel Admin
              </Nav.Link>
            )}

            {/* Botones de Sesión */}
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
              // CORRECCIÓN AQUÍ: Usamos clases de Bootstrap estándar para asegurar visibilidad
              // 'btn btn-light' hace que el botón sea blanco con texto oscuro (muy visible en fondo morado)
              // 'fw-bold' para que destaque
              <Nav.Link as={Link} to="/login" className="btn btn-light text-purple fw-bold px-3 ms-lg-2 mt-2 mt-lg-0 rounded-pill">
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