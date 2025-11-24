import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import '../styles/index.css';

// Página de Inicio: contiene las secciones principales de la portada
function Inicio() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}

export default Inicio;
