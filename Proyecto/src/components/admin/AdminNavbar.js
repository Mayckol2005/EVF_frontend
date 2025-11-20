import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Importamos los componentes de React-Bootstrap
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

function AdminNavbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // collapseOnSelect: Cierra el menú al elegir una opción (Vital para móviles)
    // expand="lg": Se convierte en hamburguesa en pantallas medianas/pequeñas
    <Navbar expand="lg" variant="dark" className="bg-purple shadow-sm sticky-top" collapseOnSelect>
      <Container fluid>
        
        {/* Marca / Título */}
        <Navbar.Brand as={Link} to="/admin" className="fw-bold">
          <i className="bi bi-shield-lock-fill me-2"></i>
          Perfumería Admin
        </Navbar.Brand>

        {/* Botón Hamburguesa */}
        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        {/* Contenido Colapsable */}
        <Navbar.Collapse id="admin-navbar-nav">
          
          {/* Menú Principal (Izquierda) */}
          <Nav className="me-auto mb-2 mb-lg-0">
            
            <Nav.Link as={NavLink} to="/admin" end>
              <i className="bi bi-speedometer2 me-1"></i> Dashboard
            </Nav.Link>

            <Nav.Link as={NavLink} to="/admin/productos">
              <i className="bi bi-box-seam me-1"></i> Productos
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/admin/boletas">
              <i className="bi bi-receipt me-1"></i> Boletas
            </Nav.Link>

            <Nav.Link as={NavLink} to="/admin/clientes">
              <i className="bi bi-people-fill me-1"></i> Clientes
            </Nav.Link>

            <Nav.Link as={NavLink} to="/admin/usuarios">
              <i className="bi bi-person-gear me-1"></i> Usuarios
            </Nav.Link>

            <Nav.Link as={NavLink} to="/admin/reportes">
              <i className="bi bi-file-earmark-bar-graph-fill me-1"></i> Reportes
            </Nav.Link>

          </Nav>

          {/* Menú Usuario (Derecha) */}
          <Nav className="align-items-lg-center">
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="link" 
                id="dropdown-admin-user" 
                className="text-white text-decoration-none d-flex align-items-center"
              >
                <i className="bi bi-person-circle me-2"></i>
                Hola, {currentUser?.nombre || 'Admin'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/admin/perfil">
                  <i className="bi bi-person-lines-fill me-2"></i> Mi Perfil
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/">
                  <i className="bi bi-shop me-2"></i> Ver Tienda
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;