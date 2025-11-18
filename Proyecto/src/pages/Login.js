import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para el error y la carga
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Envolvemos la lógica en un try...catch asíncrono
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos errores anteriores
    setLoading(true);

    try {
      // 1. Intentamos hacer login
      await login(email, password);
      
      // 2. Si tiene éxito, navegamos al inicio
      navigate('/'); 
      
    } catch (err) {
      setError(err.message); 
      
    } finally {
      // 3. Se ejecuta siempre, con o sin error
      setLoading(false); 
    }
  };

  return (
    <section className="login-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow login-card">
              <div className="card-header bg-purple text-white text-center py-3">
                <h4 className="mb-0">Iniciar Sesión</h4>
              </div>
              <div className="card-body p-4">
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Correo Electrónico
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      required
                      type="email"
                      value={email} // Conectamos al estado
                      onChange={(e) => setEmail(e.target.value)} // Conectamos al estado
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      required
                      type="password"
                      value={password} // Conectamos al estado
                      onChange={(e) => setPassword(e.target.value)} // Conectamos al estado
                    />
                  </div>
                  <div className="d-grid">
                    <button 
                      className="btn btn-purple btn-lg" 
                      type="submit"
                      disabled={loading} // Deshabilitar mientras carga
                    >
                      {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <p className="mb-0">
                  ¿No tienes una cuenta?
                  <Link className="text-purple" to="/registro">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;