import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { getAllProducts } from '../data/productsAPI'; 
import '../styles/tienda.css';

function Ofertas() {
  const [productosEnOferta, setProductosEnOferta] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 

  useEffect(() => {
    getAllProducts()
      .then(data => {
        const enOferta = data.filter(
          (producto) => producto.price < producto.normalPrice
        );
        
        setProductosEnOferta(enOferta);
      })
      .catch(error => {
        console.error("Error al cargar productos en oferta:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  
  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Buscando Ofertas...</h2>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">🔥 Perfumes en Oferta</h2>
        
        <div className="row g-4">
          
          {productosEnOferta.length > 0 ? (
            
            productosEnOferta.map(producto => (
              <div key={producto.id} className="col-lg-4 col-md-6">
                {/* Usamos las mismas clases y estructura que en Tienda.js */}
                <div className="card h-100 shadow-sm border-0 product-card"> 
                  <Link to={`/producto/${producto.id}`}>
                    <img src={producto.image} className="card-img-top" alt={producto.name} />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-purple">
                      <Link to={`/producto/${producto.id}`} className="text-decoration-none text-purple">
                        {producto.name}
                      </Link>
                    </h5>
                    
                    {/* Mostramos ambos precios */}
                    <p className="card-text h4 text-danger mb-0">
                      {formatCurrency(producto.price)}
                    </p>
                    <p className="card-text text-muted text-decoration-line-through">
                      Precio normal: {formatCurrency(producto.normalPrice)}
                    </p>
                    
                    <button 
                      onClick={() => addToCart(producto)} 
                      className="btn btn-purple mt-auto"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h4 className="text-muted">¡Vaya! No encontramos ofertas por el momento.</h4>
              <p>Vuelve a visitarnos pronto o explora nuestra <Link to="/tienda">tienda completa</Link>.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Ofertas;