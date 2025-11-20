import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { regionesComunas } from '../data/regionesComunas';
import '../styles/comprar.css';
// Solo importamos createBoleta. El backend maneja el stock.
import { createBoleta } from '../data/boletasAPI';

function Comprar() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', correo: '', calle: '',
    departamento: '', region: '', comuna: '', indicaciones: ''
  });
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState({ subtotal: 0, envio: 0, total: 0 });
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calcular totales
  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const envio = subtotal > 50000 ? 0 : 4500;
    const total = subtotal + envio;
    setSummary({ subtotal, envio, total });
  }, [cartItems]);

  // Cargar datos del usuario si está logueado
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        nombre: currentUser.nombre || '',
        apellidos: currentUser.apellidos || '',
        correo: currentUser.email || currentUser.correo || '',
        calle: currentUser.direccion || '', // Mapeamos dirección a calle
        region: currentUser.region || '',
        comuna: currentUser.comuna || '',
        departamento: '' // Este campo no solemos tenerlo en el usuario base
      }));
      
      // Cargar comunas si el usuario ya tiene región
      if (currentUser.region) {
        const regionEncontrada = regionesComunas.find(r => r.nombre === currentUser.region);
        if (regionEncontrada) {
          setComunasDisponibles(regionEncontrada.comunas);
        }
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'region') {
      const regionEncontrada = regionesComunas.find(r => r.nombre === value);
      if (regionEncontrada) {
        setComunasDisponibles(regionEncontrada.comunas);
        setFormData(prev => ({ ...prev, comuna: '' }));
      } else {
        setComunasDisponibles([]);
        setFormData(prev => ({ ...prev, comuna: '' }));
      }
    }
    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: null })); }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son obligatorios.';
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio.';
    if (!formData.calle) newErrors.calle = 'La calle es obligatoria.';
    if (!formData.region) newErrors.region = 'La región es obligatoria.';
    if (!formData.comuna) newErrors.comuna = 'La comuna es obligatoria.';
    if (formData.correo && !/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProcederAlPago = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setErrors({});
    setLoading(true);

    if (validateForm()) {
      // 1. Simulación de Pasarela de Pago (Frontend)
      // En un caso real, aquí integrarías Webpay o Stripe.
      const isPaymentSuccessful = Math.random() < 0.99; 

      if (isPaymentSuccessful) {
        try {
          // 2. Preparar datos para el Backend
          // Solo necesitamos enviar los items. El backend calcula precios y stock.
          const dataParaBackend = {
             items: cartItems // Nuestra API transformará esto al formato DTO
          };

         // 3. Llamada al Backend
          const ordenCreada = await createBoleta(dataParaBackend);
          
          // CORRECCIÓN: Usamos .numero en lugar de .id, ya que el adaptador lo transformó
          console.log("Compra exitosa, Boleta N°:", ordenCreada.numero);

          // 4. Limpiar carrito y redirigir
          clearCart();
          
          navigate('/pago-correcto', {
            state: {
              // Pasamos el objeto 'ordenCreada' directo, ya viene formateado por el adaptador
              boletaData: ordenCreada, 
              nombre: formData.nombre
            }
          });

        } catch (error) {
          console.error("Error en el backend:", error);
          // Si el backend falla (ej: Stock insuficiente), mostramos el error
          setLoading(false); 
          navigate('/pago-error', { state: { message: error.message } });
        }

      } else {
        // Fallo en la simulación de pago (tarjeta rechazada)
        console.log("Pago rechazado por la pasarela simulada.");
        setLoading(false); 
        navigate('/pago-error', { state: { message: "Tu tarjeta fue rechazada por el banco." } });
      }
    } else {
      setLoading(false); 
      alert("Por favor, corrige los errores marcados en el formulario.");
    }
  };

  const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="text-purple">Tu carrito está vacío.</h2>
        <Link to="/tienda" className="btn btn-purple mt-3">Ir a la Tienda</Link>
      </div>
    );
  }

  return (
    <section className="py-5 comprar-section">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Finalizar Compra</h2>
        <div className="row g-5">
          <div className="col-lg-7">
            <form onSubmit={handleProcederAlPago}>
              {/* --- Tarjeta de Información del Cliente --- */}
              <h4 className="mb-3 text-purple">Información del Cliente</h4>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="nombre" className="form-label">Nombre<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                      {errors.nombre && <div className="invalid-feedback d-block">{errors.nombre}</div>}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="apellidos" className="form-label">Apellidos<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                      {errors.apellidos && <div className="invalid-feedback d-block">{errors.apellidos}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="correo" className="form-label">Correo Electrónico<span className="text-danger"> *</span></label>
                      <input type="email" className={`form-control ${errors.correo ? 'is-invalid' : ''}`} id="correo" name="correo" placeholder="tu@correo.com" value={formData.correo} onChange={handleChange} />
                      {errors.correo && <div className="invalid-feedback d-block">{errors.correo}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Tarjeta de Información de Envío --- */}
              <h4 className="mb-3 text-purple">Información de Envío</h4>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="calle" className="form-label">Calle y Número<span className="text-danger"> *</span></label>
                      <input type="text" className={`form-control ${errors.calle ? 'is-invalid' : ''}`} id="calle" name="calle" placeholder="Ej: Av. Principal 123" value={formData.calle} onChange={handleChange} />
                      {errors.calle && <div className="invalid-feedback d-block">{errors.calle}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="departamento" className="form-label">Departamento, Oficina, etc. <span className="text-muted">(Opcional)</span></label>
                      <input type="text" className="form-control" id="departamento" name="departamento" placeholder="Ej: Depto 101" value={formData.departamento} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="region" className="form-label">Región<span className="text-danger"> *</span></label>
                      <select
                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                        id="region" name="region" value={formData.region} onChange={handleChange}
                      >
                        <option value="">Seleccione una región...</option>
                        {regionesComunas.map(region => (<option key={region.nombre} value={region.nombre}>{region.nombre}</option>))}
                      </select>
                      {errors.region && <div className="invalid-feedback d-block">{errors.region}</div>}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="comuna" className="form-label">Comuna<span className="text-danger"> *</span></label>
                      <select
                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                        id="comuna" name="comuna" value={formData.comuna} onChange={handleChange}
                        disabled={comunasDisponibles.length === 0}
                      >
                        <option value="">{formData.region ? "Seleccione una comuna..." : "Primero elija una región..."}</option>
                        {comunasDisponibles.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
                      </select>
                      {errors.comuna && <div className="invalid-feedback d-block">{errors.comuna}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega <span className="text-muted">(Opcional)</span></label>
                      <textarea className="form-control" id="indicaciones" name="indicaciones" rows="3" placeholder="Ej: Entregar en conserjería, timbre no funciona..." value={formData.indicaciones} onChange={handleChange}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Botones de Acción --- */}
              <div className="d-grid gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-purple btn-lg"
                  disabled={loading}
                >
                  {loading ? 'Procesando Pago...' : 'Proceder al Pago'}
                </button>
                <Link to="/carrito" className="btn btn-outline-secondary btn-sm">Volver al Carrito</Link>
              </div>
            </form>
          </div>

          <div className="col-lg-5">
            <h4 className="mb-3 text-purple">Resumen de tu Compra</h4>
            <div 
              className="card shadow-sm border-0 sticky-top" 
              style={{ top: '5rem', zIndex: 1010 }}
            >
              <div className="card-header bg-purple text-white">Detalle de los Productos</div>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 text-purple">{item.name}</h6>
                      <small className="text-muted">{formatCurrency(item.price)} x {item.quantity}</small>
                    </div>
                    <span className="fw-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="card-body p-4">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Subtotal</span>
                    <span className="fw-bold">{formatCurrency(summary.subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Envío</span>
                    <span className="fw-bold">{summary.envio === 0 ? "Gratis" : formatCurrency(summary.envio)}</span>
                  </li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-purple">Total a Pagar:</h5>
                <h5 className="mb-0 text-purple fw-bold">{formatCurrency(summary.total)}</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Comprar;