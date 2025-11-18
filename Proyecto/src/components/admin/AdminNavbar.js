// src/components/admin/AdminNavbar.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Dropdown } from 'react-bootstrap';

function AdminNavbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">
          Perfumería Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" end>
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/productos">
                <i className="bi bi-box-seam me-1"></i> Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/boletas">
                <i className="bi bi-receipt me-1"></i> Boletas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/clientes">
                <i className="bi bi-people-fill me-1"></i> Clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/usuarios">
                <i className="bi bi-person-gear me-1"></i> Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/reportes">
                <i className="bi bi-file-earmark-bar-graph-fill me-1"></i>
                Reportes
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">

            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-admin-user" className="text-white text-decoration-none d-flex align-items-center">
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
                <Dropdown.Item onClick={logout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;