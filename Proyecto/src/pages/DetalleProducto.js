import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { getProductById } from '../data/productsAPI'; 

function DetalleProducto() {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    
    getProductById(id)
      .then(data => {
        setProducto(data);
      })
      .catch(error => {
        console.error(error.message);
        setProducto(null); 
      })
      .finally(() => {
        setLoading(false); 
      });
      
  }, [id]); 

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Cargando Producto...</h2>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Producto no encontrado</h2>
        <p>El perfume que buscas no existe o fue removido.</p>
        <Link to="/tienda" className="btn btn-purple">Volver a la Tienda</Link>
      </div>
    );
  }

  return (
    <main className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img src={producto.image} alt={producto.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-7">
          <h2 className="text-purple fw-bold">{producto.name}</h2>
          
          <p><strong>Género:</strong> {producto.genero}</p>
          <p><strong>Tipo:</strong> {producto.tipo}</p>
          <p>{producto.description}</p>
          
          <p className="text-decoration-line-through text-muted">{formatCurrency(producto.normalPrice)}</p>
          <p className="fs-3 fw-bold text-danger">{formatCurrency(producto.price)}</p>
          
          <div className="d-flex gap-3 mt-4">
            <button 
              onClick={() => addToCart(producto)} 
              className="btn btn-purple btn-lg"
            >
              Agregar al Carrito
            </button>
            <Link to="/tienda" className="btn btn-outline-purple btn-lg">Volver a la Tienda</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;