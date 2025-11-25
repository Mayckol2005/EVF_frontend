import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert, Image, Spinner, Row, Col } from 'react-bootstrap';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../data/productsAPI';
import NavBar from '../../components/admin/AdminNavbar';
// 1. Importamos la lista de imágenes
import { imagenesDisponibles } from '../../data/imagenesList';

const initialFormState = {
  name: '',
  brand: '',
  price: '',
  normalPrice: '',
  stock: '',
  image: '',
  categoriaId: 'perfumes-dama',
  genero: '',
  description: '',
  tipo: ''
};

const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modales
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // Nuevo estado para el selector de imagen

  const [formData, setFormData] = useState(initialFormState);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cargar productos
  const loadProducts = () => {
    setLoading(true);
    getAllProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setError("Error al cargar productos.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal de producto (Crear/Editar)
  const handleOpenModal = (product = null) => {
    setError(null);
    setSuccess(null);
    if (product) {
      setEditingProduct(product);
      setFormData(product); // Cargar datos existentes
    } else {
      setEditingProduct(null);
      setFormData(initialFormState); // Limpiar formulario
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setEditingProduct(null);
  };

  // Guardar (Crear o Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validación básica
    if (!formData.name || !formData.price || !formData.stock) {
        setError("Por favor completa los campos obligatorios.");
        return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setSuccess("Producto actualizado correctamente.");
      } else {
        await createProduct(formData);
        setSuccess("Producto creado correctamente.");
      }
      handleCloseModal();
      loadProducts(); // Recargar tabla
    } catch (err) {
      setError("Ocurrió un error al guardar el producto.");
      console.error(err);
    }
  };

  // Borrar
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        setError("Error al eliminar el producto.");
      }
    }
  };

  // 2. Función para seleccionar imagen desde la galería
  const handleSelectImage = (imgSrc) => {
    setFormData(prev => ({ ...prev, image: imgSrc }));
    setShowImageModal(false);
  };

  return (
    <>
      <NavBar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-purple">Gestión de Productos</h1>
          <Button variant="purple" onClick={() => handleOpenModal()}>
            <i className="bi bi-plus-circle me-2"></i>Nuevo Producto
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {loading ? (
          <div className="text-center"><Spinner animation="border" variant="purple" /></div>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <Table hover className="align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        width="50" height="50" 
                        className="rounded object-fit-cover" 
                        onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{p.name}</div>
                      <small className="text-muted">{p.brand}</small>
                    </td>
                    <td>{p.categoriaId}</td>
                    <td>
                        {p.price < p.normalPrice ? (
                            <>
                                <span className="text-danger fw-bold me-2">{formatCurrency(p.price)}</span>
                                <small className="text-decoration-line-through text-muted">{formatCurrency(p.normalPrice)}</small>
                            </>
                        ) : formatCurrency(p.price)}
                    </td>
                    <td>
                        <span className={`badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                            {p.stock}
                        </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleOpenModal(p)}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* --- MODAL DE PRODUCTO (FORMULARIO) --- */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              
              <Row className="mb-3">
                 <Form.Group as={Col} md="6">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                 </Form.Group>
                 <Form.Group as={Col} md="6">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
                 </Form.Group>
              </Row>

              <Row className="mb-3">
                 <Form.Group as={Col} md="4">
                    <Form.Label>Precio Oferta *</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                 </Form.Group>
                 <Form.Group as={Col} md="4">
                    <Form.Label>Precio Normal</Form.Label>
                    <Form.Control type="number" name="normalPrice" value={formData.normalPrice} onChange={handleChange} />
                 </Form.Group>
                 <Form.Group as={Col} md="4">
                    <Form.Label>Stock *</Form.Label>
                    <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                 </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Imagen URL</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control 
                        type="text" 
                        name="image" 
                        value={formData.image} 
                        onChange={handleChange} 
                        placeholder="/assets/img/foto.jpg"
                    />
                    {/* 3. Botón para abrir el selector */}
                    <Button variant="outline-secondary" onClick={() => setShowImageModal(true)}>
                        <i className="bi bi-images"></i> Ver
                    </Button>
                </div>
                {/* Previsualización pequeña */}
                {formData.image && (
                    <div className="mt-2">
                        <img src={formData.image} alt="Preview" style={{ height: '60px', borderRadius: '5px' }} onError={(e)=>e.target.style.display='none'} />
                    </div>
                )}
              </Form.Group>

              <Row className="mb-3">
                 <Form.Group as={Col} md="4">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                       <option value="perfumes-dama">Perfumes Dama</option>
                       <option value="perfumes-varon">Perfumes Varón</option>
                       <option value="perfumes-unisex">Perfumes Unisex</option>
                    </Form.Select>
                 </Form.Group>
                 <Form.Group as={Col} md="4">
                    <Form.Label>Género</Form.Label>
                    <Form.Control type="text" name="genero" value={formData.genero} onChange={handleChange} placeholder="Ej: Masculino"/>
                 </Form.Group>
                 <Form.Group as={Col} md="4">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Ej: Eau de Parfum"/>
                 </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button variant="purple" type="submit">Guardar</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* --- 4. NUEVO MODAL DE SELECCIÓN DE IMÁGENES --- */}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Seleccionar Imagen Disponible</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="g-3">
                    {imagenesDisponibles.map((imgSrc, idx) => (
                        <Col xs={6} md={3} key={idx}>
                            <div 
                                className="border rounded p-1 text-center" 
                                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                onClick={() => handleSelectImage(imgSrc)}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img 
                                    src={imgSrc} 
                                    alt="Opción" 
                                    className="img-fluid rounded mb-1" 
                                    style={{ height: '100px', objectFit: 'cover' }}
                                />
                                <div style={{ fontSize: '0.7rem', wordBreak: 'break-all' }}>
                                    {imgSrc.split('/').pop()}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </Modal>

      </main>
    </>
  );
}

export default GestionProductos;