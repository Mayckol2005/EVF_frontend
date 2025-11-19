import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert, Image, Spinner, Row, Col } from 'react-bootstrap';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../data/productsAPI';
import NavBar from '../../components/admin/AdminNavbar';

// Estado inicial del formulario
const initialFormState = {
  name: '',
  brand: '',
  price: '',
  normalPrice: '',
  stock: '',
  image: '',
  categoriaId: 'perfumes-dama',
  genero: '',
  description: ''
};

// Formato de moneda
const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
        console.error("Error al cargar productos:", err);
        setError("No se pudo cargar la lista de productos.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(initialFormState);
    setError(null);
    setSuccess(null);
  };

  const handleShowCreateModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  const handleShowEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      ...initialFormState,
      ...product,
      price: product.price?.toString() || '',
      normalPrice: product.normalPrice?.toString() || '',
      stock: product.stock?.toString() ?? '',
    });
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validaciones
    if (!formData.name || !formData.brand || !formData.price || !formData.normalPrice || formData.stock === '') {
      setError("Por favor, completa todos los campos obligatorios (*).");
      return;
    }
    if (isNaN(parseFloat(formData.price)) || isNaN(parseFloat(formData.normalPrice)) || isNaN(parseInt(formData.stock))) {
      setError("Precio, Precio Normal y Stock deben ser números válidos.");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setSuccess("Producto actualizado con éxito.");
      } else {
        await createProduct(formData);
        setSuccess("Producto creado con éxito.");
      }
      handleCloseModal();
      loadProducts();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setError(err.message || "Ocurrió un error al guardar.");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) {
      try {
        await deleteProduct(id);
        alert("Producto eliminado.");
        loadProducts();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert(err.message || "Error al eliminar el producto.");
      }
    }
  };


  return (
    <>
      <NavBar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-purple">Gestión de Productos</h1>
          <Button variant="purple" onClick={handleShowCreateModal}>
            <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
          </Button>
        </div>

        {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
        {error && !showModal && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

        {loading ? (
          <div className="text-center"><Spinner animation="border" variant="purple" /></div>
        ) : (
          <div className="table-responsive shadow-sm">
            <Table striped bordered hover className="align-middle">
              <thead className="table-purple">
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Precio Oferta</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <Image src={product.image || 'https://via.placeholder.com/60'} alt={product.name} thumbnail style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td className={product.stock < 10 ? 'text-danger fw-bold' : ''}>{product.stock}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowEditModal(product)}
                        title="Editar Producto"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Eliminar Producto"
                      >
                         <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </td>
                  </tr>
                )) : (
                   <tr>
                    <td colSpan="7" className="text-center text-muted">No hay productos registrados.</td>
                   </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* Modal Crear/Editar */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton className="bg-purple text-white">
              <Modal.Title>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Row className="mb-3">
                 <Form.Group as={Col} md="8">
                    <Form.Label>Nombre Producto *</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                 </Form.Group>
                 <Form.Group as={Col} md="4">
                    <Form.Label>Marca *</Form.Label>
                    <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                 </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Precio Oferta ($) *</Form.Label>
                  <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Precio Normal ($) *</Form.Label>
                  <Form.Control type="number" name="normalPrice" value={formData.normalPrice} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
                {formData.image && <Image src={formData.image} thumbnail className="mt-2" style={{ maxHeight: '100px' }} />}
              </Form.Group>

              <Row className="mb-3">
                 <Form.Group as={Col} md="6">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                       <option value="perfumes-dama">Perfumes Dama</option>
                       <option value="perfumes-varon">Perfumes Varón</option>
                       <option value="perfumes-unisex">Perfumes Unisex</option>
                    </Form.Select>
                 </Form.Group>
                 <Form.Group as={Col} md="6">
                    <Form.Label>Género</Form.Label>
                    <Form.Control type="text" name="genero" value={formData.genero} onChange={handleChange} placeholder="Ej: Femenino, Masculino, Unisex"/>
                 </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button variant="purple" type="submit">Guardar Cambios</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </main>
    </>
  );
}

export default GestionProductos;