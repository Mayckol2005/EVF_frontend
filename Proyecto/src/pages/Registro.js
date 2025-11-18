import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 1. Importar los datos de regiones
import { regionesComunas } from '../data/regionesComunas';

function Registro() {
  // 2. Todos los campos están aquí (los originales + los nuevos)
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    correo: '',
    confirmarCorreo: '',
    password: '',
    confirmarPassword: '',
    direccion: '',
    region: '',
    comuna: ''  
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 3. Estado para las comunas que se pueden seleccionar
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  const navigate = useNavigate();

  const { register } = useAuth();

  // 4. Función GENÉRICA para inputs simples
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // 5. Función ESPECIAL para manejar el cambio de REGIÓN
  const handleRegionChange = (e) => {
    const regionNombre = e.target.value;

    setFormData(prevState => ({
      ...prevState,
      region: regionNombre,
      comuna: '' // Reseteamos la comuna cada vez que la región cambia
    }));

    // Buscamos las comunas de esa región
    const regionSeleccionada = regionesComunas.find(r => r.nombre === regionNombre);

    // Actualizamos el estado de las comunas disponibles
    if (regionSeleccionada) {
      setComunasDisponibles(regionSeleccionada.comunas);
    } else {
      setComunasDisponibles([]);
    }
  };

  // 6. handleSubmit actualizado con TODAS las validaciones
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = {};
    if (formData.correo !== formData.confirmarCorreo) {
      newErrors.correo = 'Los correos electrónicos no coinciden.';
    }
    if (formData.password !== formData.confirmarPassword) {
      newErrors.password = 'Las contraseñas no coinciden.';
    }

    // Validación de campos nuevos obligatorios
    if (!formData.region) {
      newErrors.region = 'Debe seleccionar una región.';
    }
    if (!formData.comuna) {
      newErrors.comuna = 'Debe seleccionar una comuna.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // 7. Se envían TODOS los datos a la API
      const userData = {
        rut: formData.rut,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        correo: formData.correo,
        password: formData.password,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna
      };

      await register(userData);

      alert('¡Registro exitoso! Bienvenido/a.');
      navigate('/');

    } catch (error) {
      console.error("Error en el registro:", error);
      setErrors({ general: error.message || 'Hubo un error al crear la cuenta. Por favor, intente más tarde.' });
      setLoading(false);
    }
  };

  return (
    <section className="registro-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow-lg">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Crea tu Cuenta</h4>
              </div>
              <div className="card-body p-4 p-md-5">

                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="rut" className="form-label fw-bold">RUT *</label>
                      <input type="text" className="form-control" id="rut" required value={formData.rut} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nombre" className="form-label fw-bold">Nombre *</label>
                      <input type="text" className="form-control" id="nombre" required value={formData.nombre} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label fw-bold">Apellidos *</label>
                    <input type="text" className="form-control" id="apellidos" required value={formData.apellidos} onChange={handleChange} />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="correo" className="form-label fw-bold">Correo *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                        id="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmarCorreo" className="form-label fw-bold">Confirmar Correo *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                        id="confirmarCorreo"
                        required
                        value={formData.confirmarCorreo}
                        onChange={handleChange}
                      />
                      {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label fw-bold">Contraseña *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmarPassword" className="form-label fw-bold">Confirmar Contraseña *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="confirmarPassword"
                        required
                        value={formData.confirmarPassword}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion" className="form-label fw-bold">Dirección *</label>
                    <textarea
                      className="form-control"
                      id="direccion"
                      rows="2"
                      required
                      value={formData.direccion}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="region" className="form-label fw-bold">Región *</label>
                      <select
                        id="region"
                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                        value={formData.region}
                        onChange={handleRegionChange}
                        required
                      >
                        <option value="" disabled>Seleccione una región...</option>
                        {regionesComunas.map(region => (
                          <option key={region.nombre} value={region.nombre}>
                            {region.nombre}
                          </option>
                        ))}
                      </select>
                      {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="comuna" className="form-label fw-bold">Comuna *</label>
                      <select
                        id="comuna"
                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                        value={formData.comuna}
                        onChange={handleChange} 
                        required
                        disabled={comunasDisponibles.length === 0}
                      >
                        <option value="" disabled>
                          {formData.region ? "Seleccione una comuna..." : "Primero elija una región..."}
                        </option>
                        {comunasDisponibles.map(comuna => (
                          <option key={comuna} value={comuna}>
                            {comuna}
                          </option>
                        ))}
                      </select>
                      {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Link to="/login" className="btn btn-outline-secondary btn-lg">Cancelar</Link>
                    <button type="submit" className="btn btn-purple btn-lg" disabled={loading}>
                      {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;