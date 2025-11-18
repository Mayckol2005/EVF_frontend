import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import '../styles/index.css';

// La página "Inicio" es un contenedor para las secciones de esa página
function Inicio() {
  return (
    // Usamos un Fragment <>...</> para agrupar los componentes
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}

export default Inicio;