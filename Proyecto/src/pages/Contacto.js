import React, { useState } from 'react';

function Contacto() {
  // 1. Estado para manejar los campos del formulario de contacto
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // 3. Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    // Limpiar el formulario después de enviar
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <section className="contacto-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="text-purple">Contáctanos</h2>
              <p className="lead">Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.</p>
            </div>

            <div className="row">
              {/* Columna de Información de Contacto */}
              <div className="col-md-5 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-purple text-white">
                    <h5 className="mb-0">Información de Contacto</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-3">
                      <div className="me-3 fs-5 text-purple"><i className="fas fa-map-marker-alt"></i></div>
                      <div>
                        <h6 className="mb-0">Dirección</h6>
                        <p className="mb-0 text-muted">Av. Principal 1234, Santiago, Chile</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <div className="me-3 fs-5 text-purple"><i className="fas fa-phone"></i></div>
                      <div>
                        <h6 className="mb-0">Teléfono</h6>
                        <p className="mb-0 text-muted">+56 9 1234 5678</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <div className="me-3 fs-5 text-purple"><i className="fas fa-envelope"></i></div>
                      <div>
                        <h6 className="mb-0">Email</h6>
                        <p className="mb-0 text-muted">contacto@tiendaduocpm.cl</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="me-3 fs-5 text-purple"><i className="fas fa-clock"></i></div>
                      <div>
                        <h6 className="mb-0">Horario de Atención</h6>
                        <p className="mb-0 text-muted">Lunes a Viernes: 9:00 - 18:00<br />Sábado: 10:00 - 14:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna del Formulario */}
              <div className="col-md-7">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-purple text-white">
                    <h5 className="mb-0">Envíanos un Mensaje</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mensaje" className="form-label">Mensaje *</label>
                        <textarea
                          className="form-control"
                          id="mensaje"
                          rows="5"
                          required
                          placeholder="Escribe tu mensaje aquí..."
                          value={formData.mensaje}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-purple btn-lg">Enviar Mensaje</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
