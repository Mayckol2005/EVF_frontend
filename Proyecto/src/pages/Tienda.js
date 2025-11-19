import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { getAllProducts } from '../data/productsAPI'; 
import '../styles/tienda.css';

const titulosDeCategoria = {
  'perfumes-varon': 'Perfumes Varón',
  'perfumes-dama': 'Perfumes Dama',
  'perfumes-unisex': 'Perfumes Unisex',
};

function Tienda() {
  const [searchParams] = useSearchParams();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [titulo, setTitulo] = useState('Nuestros Perfumes');
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setProductos(data); 
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  useEffect(() => {
    const categoriaSeleccionada = searchParams.get('categoria');

    if (categoriaSeleccionada && productos.length > 0) {
      const filtrados = productos.filter(
        (producto) => producto.categoriaId === categoriaSeleccionada
      );
      
      setProductosFiltrados(filtrados); 
      setTitulo(titulosDeCategoria[categoriaSeleccionada] || 'Tienda'); 

    } else {
      setProductosFiltrados(productos);
      setTitulo('Nuestros Perfumes');
    }

  }, [productos, searchParams]);

  
  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Cargando Productos...</h2>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">{titulo}</h2>
        
        <div className="row g-4">
          
          {productosFiltrados.length > 0 ? (
            
            productosFiltrados.map(producto => (
              <div key={producto.id} className="col-lg-4 col-md-6">
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
                    <p className="card-text h4 text-muted">{formatCurrency(producto.price)}</p>
                    
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
              <h4 className="text-muted">No se encontraron productos en esta categoría.</h4>
              <p>Puedes explorar nuestras otras <Link to="/categorias">categorías</Link>.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tienda;