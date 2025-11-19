import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../data/usersAPI';
import { regionesComunas } from '../../data/regionesComunas';
import NavBar from '../../components/admin/AdminNavbar';

// Estado inicial del formulario (vacío para creación)
const initialFormState = {
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  tipo: 'cliente',
  rut: '',
  direccion: '',
  region: '',
  comuna: ''
};

function GestionUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  // Cargar usuarios al montar
  const loadUsers = () => {
    setLoading(true);
    getAllUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar usuarios:", err);
        setError("No se pudo cargar la lista de usuarios.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(initialFormState);
    setError(null);
    setSuccess(null);
    setComunasDisponibles([]);
  };

  const handleShowCreateModal = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setError(null);
    setSuccess(null);
    setShowModal(true);
    setComunasDisponibles([]);
  };

  const handleShowEditModal = (user) => {
    const { password, ...userDataForForm } = user;
    setEditingUser(user);
    setFormData({ ...initialFormState, ...userDataForForm, password: '' });
    setError(null);
    setSuccess(null);

    if (userDataForForm.region) {
      const regionSel = regionesComunas.find(r => r.nombre === userDataForForm.region);
      setComunasDisponibles(regionSel ? regionSel.comunas : []);
    } else {
      setComunasDisponibles([]);
    }

    setShowModal(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Si cambia la región, actualizar comunas
    if (name === 'region') {
      const regionSel = regionesComunas.find(r => r.nombre === value);
      setComunasDisponibles(regionSel ? regionSel.comunas : []);
      // Reseteamos la comuna seleccionada
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Copiamos los datos, excluyendo la contraseña si está vacía (en edición)
    let dataToSend = { ...formData };
    if (editingUser && !formData.password) {
      delete dataToSend.password; // No enviar contraseña vacía al actualizar
    }

    // Validaciones básicas
    if (!dataToSend.correo) {
      setError("El correo es obligatorio.");
      return;
    }
    if (!editingUser && !dataToSend.password) {
      setError("La contraseña es obligatoria al crear un usuario.");
      return;
    }


    try {
      if (editingUser) {
        await updateUser(editingUser.id, dataToSend);
        setSuccess("Usuario actualizado con éxito.");
      } else {
        await createUser(dataToSend);
        setSuccess("Usuario creado con éxito.");
      }
      handleCloseModal();
      loadUsers();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      setError(err.message || "Ocurrió un error al guardar.");
    }
  };

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) {
      try {
        await deleteUser(id);
        alert("Usuario eliminado.");
        loadUsers();
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        alert(err.message || "Error al eliminar el usuario.");
      }
    }
  };


  return (
    <>
      <NavBar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-purple">Gestión de Usuarios</h1>
          <Button variant="purple" onClick={handleShowCreateModal}>
            <i className="bi bi-plus-lg me-2"></i>Nuevo Usuario
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-purple" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error && !showModal ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="table-responsive shadow-sm">
            <Table striped bordered hover className="align-middle">
              <thead className="table-purple">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th>Región</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre} {user.apellidos}</td>
                    <td>{user.correo}</td>
                    <td>
                      <span className={`badge ${user.tipo === 'administrador' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.tipo}
                      </span>
                    </td>
                    <td>{user.region || '-'}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowEditModal(user)}
                        title="Editar Usuario"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(user.id, `${user.nombre} ${user.apellidos}`)}
                        title="Eliminar Usuario"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No hay usuarios registrados.</td>
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
              <Modal.Title>{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Mostrar errores específicos del modal */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Campos del formulario */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Apellidos *</Form.Label>
                    <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico *</Form.Label>
                <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña {editingUser ? '(Dejar en blanco para no cambiar)' : '*'}</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder={editingUser ? 'Nueva contraseña (opcional)' : ''} required={!editingUser} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Usuario *</Form.Label>
                <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                  <option value="cliente">Cliente</option>
                  <option value="administrador">Administrador</option>
                </Form.Select>
              </Form.Group>

              <hr />
              <h5 className="text-muted mb-3">Información Adicional (Opcional)</h5>

              <Form.Group className="mb-3">
                <Form.Label>RUT</Form.Label>
                <Form.Control type="text" name="rut" value={formData.rut} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
              </Form.Group>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Región</Form.Label>
                    <Form.Select name="region" value={formData.region} onChange={handleChange}>
                      <option value="">Seleccione...</option>
                      {regionesComunas.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Comuna</Form.Label>
                    <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} disabled={comunasDisponibles.length === 0}>
                      <option value="">{formData.region ? 'Seleccione...' : 'Elija región'}</option>
                      {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>


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

export default GestionUsuarios;