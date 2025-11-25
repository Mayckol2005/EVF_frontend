import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Image, Button, Form } from 'react-bootstrap';
import '../styles/carrito.css';

function Carrito() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  const handleQuantityChange = (id, newQuantity, stock) => {
    let qty = parseInt(newQuantity, 10) || 1;
    if (qty < 1) qty = 1;

    if (stock !== undefined && qty > stock) {
      qty = stock;
      alert(`Solo quedan ${stock} unidades disponibles de este producto.`);
    }

    updateQuantity(id, qty);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Tu carrito está vacío.</h2>
        <p>Añade algunos productos para verlos aquí.</p>
        <Link to="/tienda" className="btn btn-purple mt-3">
          <i className="bi bi-shop me-2"></i>Ir a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <section className="carrito-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Tu Carrito de Compras</h2>
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card shadow-sm mb-3 cart-item">
                <div className="row g-0">
                  <div className="col-md-3 d-flex align-items-center justify-content-center p-2">
                    <Image
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ maxHeight: '100px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                      <div className="mb-2 mb-sm-0 me-sm-3">
                        <h5 className="card-title mb-1 text-purple">{item.name}</h5>
                        <p className="card-text mb-0 fw-bold">{formatCurrency(item.price)}</p>
                        {item.stock !== undefined && item.stock <= 5 && item.quantity < item.stock && (
                          <small className="text-danger d-block mt-1">¡Quedan pocas unidades!</small>
                        )}
                        {item.stock !== undefined && item.quantity === item.stock && (
                          <small className="text-success d-block mt-1">Has añadido el máximo disponible.</small>
                        )}
                      </div>

                      <div className="d-flex align-items-center quantity-controls mb-2 mb-sm-0">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                          disabled={item.quantity <= 1}
                          aria-label="Disminuir cantidad"
                        >
                          <i className="bi bi-dash-lg"></i>
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value, item.stock)}
                          min="1"
                          max={item.stock}
                          className="mx-2 text-center quantity-input"
                          style={{ width: '60px' }}
                          aria-label={`Cantidad de ${item.name}`}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                          disabled={item.stock !== undefined && item.quantity >= item.stock}
                          aria-label="Aumentar cantidad"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </Button>
                      </div>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="align-self-sm-center"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-end mt-3">
              <Button variant="danger" onClick={clearCart}>
                Vaciar Carrito
              </Button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Resumen del Pedido</h5>
              </div>
              <div className="card-body p-4">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Subtotal</span>
                    <span className="fw-bold">{formatCurrency(summary.subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Envío</span>
                    <span className="fw-bold">
                      {summary.envio === 0 ? 'Gratis' : formatCurrency(summary.envio)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-top pt-3">
                    <h5 className="mb-0 text-purple">Total</h5>
                    <h5 className="mb-0 text-purple fw-bold">{formatCurrency(summary.total)}</h5>
                  </li>
                </ul>
                <div className="d-grid">
                  <Link to="/comprar" className="btn btn-purple btn-lg">
                    Ir a Pagar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carrito;
