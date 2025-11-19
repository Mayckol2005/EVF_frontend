import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts'; 
import '../styles/categorias.css'; 

const Categorias = () => {
    // Lista de categorías
  const listaDeCategorias = [
    { id: 'perfumes-varon', nombre: 'Perfumes Varón' },
    { id: 'perfumes-dama', nombre: 'Perfumes Dama' },
    { id: 'perfumes-unisex', nombre: 'Perfumes Unisex' },
  ];

  return (
    <div className="categorias-section container">
      
      <h1 className="page-title">Explora nuestras Categorías</h1>
      <p className="text-center mb-5">Encuentra la fragancia perfecta para cada ocasión.</p>
      <div className="row g-4 justify-content-center">
        {listaDeCategorias.map((categoria) => (
          <div className="col-lg-4 col-md-6" key={categoria.id}>
            
            <Link 
              to={`/tienda?categoria=${categoria.id}`} 
              className="card card-categoria text-center text-decoration-none"
            >
              <div className="card-body">
                <h3 className="card-title">{categoria.nombre}</h3>
              </div>
            </Link>

          </div>
        ))}
      </div>

      {/* Sección de Destacados */}
      <hr className="my-5" />
      <div className="mt-5">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Categorias;