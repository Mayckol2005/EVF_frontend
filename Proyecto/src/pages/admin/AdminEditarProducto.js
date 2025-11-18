import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../data/productsAPI';
import '../../styles/AdminForm.css';
import NavBar from '../../components/admin/AdminNavbar';

function AdminEditarProducto() {
  // 4. Obtenemos el 'id' de la URL (ej: /admin/producto/editar/7)
  const { id } = useParams();
  const navigate = useNavigate();

  // 5. Estado para guardar los datos del producto
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 6. useEffect para cargar los datos del producto al iniciar
  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(data => {
        setProducto(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al cargar el producto.");
        setLoading(false);
      });
  }, [id]); // Se ejecuta cada vez que el 'id' de la URL cambia

  // 7. Manejador para actualizar el estado del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  // 8. Manejador para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Llamamos a la función de la API para actualizar
    updateProduct(id, producto)
      .then(updatedProduct => {
        setProducto(updatedProduct); // Opcional: actualizar con la respuesta
        setSuccess('¡Producto actualizado con éxito!');
        // Opcional: redirigir después de un tiempo
        setTimeout(() => {
          navigate('/admin'); // Volver al dashboard
        }, 1500);
      })
      .catch(err => {
        setError('Error al actualizar el producto.');
      });
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border text-purple" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </>
    );
  }

  if (error && !producto) {
    return (
      <>
        <NavBar />
        <div className="container p-4"><div className="alert alert-danger">{error}</div></div>
      </>
    );
  }

  // 9. Renderizado del formulario (solo si el producto se cargó)
  return (
    <>
      <NavBar />
      <div className="container-fluid p-4 admin-form-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-purple text-white">
                <h4 className="mb-0">Editar Producto: {producto?.name}</h4>
              </div>
              <div className="card-body p-4">
                {producto ? (
                  <form onSubmit={handleSubmit}>
                    {/* --- Fila 1: Nombre y Marca --- */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nombre del Producto</label>
                        <input type="text" className="form-control" id="name" name="name" value={producto.name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="brand" className="form-label">Marca</label>
                        <input type="text" className="form-control" id="brand" name="brand" value={producto.brand} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* --- Fila 2: Precios --- */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Precio de Oferta ($)</label>
                        <input type="number" className="form-control" id="price" name="price" value={producto.price} onChange={handleChange} required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="normalPrice" className="form-label">Precio Normal ($)</label>
                        <input type="number" className="form-control" id="normalPrice" name="normalPrice" value={producto.normalPrice} onChange={handleChange} required />
                      </div>
                      {/* --- CAMPO DE STOCK --- */}
                      <div className="col-md-4">
                        <label htmlFor="stock" className="form-label fw-bold text-danger">Stock Actual</label>
                        <input type="number" className="form-control is-invalid" id="stock" name="stock" value={producto.stock} onChange={handleChange} required />
                        {producto.stock < 10 && <div className="invalid-feedback d-block">¡Stock bajo!</div>}
                      </div>
                    </div>

                    {/* --- Fila 3: Categoría y Género --- */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label htmlFor="categoriaId" className="form-label">Categoría</label>
                        <select className="form-select" id="categoriaId" name="categoriaId" value={producto.categoriaId} onChange={handleChange}>
                          <option value="perfumes-varon">Perfumes Varón</option>
                          <option value="perfumes-dama">Perfumes Dama</option>
                          <option value="perfumes-unisex">Perfumes Unisex</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="genero" className="form-label">Género</label>
                        <input type="text" className="form-control" id="genero" name="genero" value={producto.genero} onChange={handleChange} />
                      </div>
                    </div>

                    {/* --- Fila 4: Descripción --- */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Descripción</label>
                      <textarea className="form-control" id="description" name="description" rows="4" value={producto.description} onChange={handleChange}></textarea>
                    </div>

                    {/* --- Botones y Mensajes --- */}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>Cancelar</button>
                      <button type="submit" className="btn btn-purple">Guardar Cambios</button>
                    </div>
                  </form>
                ) : (
                  <p>No se encontraron datos del producto.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEditarProducto;