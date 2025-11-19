import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="flex-grow-1">
        {/* Aquí se renderizarán las páginas (Inicio, Tienda, Admin, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;