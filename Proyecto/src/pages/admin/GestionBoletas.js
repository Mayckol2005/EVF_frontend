import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { getAllBoletas } from '../../data/boletasAPI';
import Boleta from '../../components/Boleta';
import NavBar from '../../components/admin/AdminNavbar';
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

function GestionBoletas() {
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllBoletas()
      .then(data => {
        // Mostramos las más nuevas primero
        setBoletas(data.reverse());
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar boletas:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Cargando boletas...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main className="container my-5">
        <h1 className="text-purple mb-4">Gestión de Boletas</h1>

        {boletas.length === 0 ? (
          <div className="alert alert-info text-center">
            Aún no se ha generado ninguna boleta.
          </div>
          
      ) : (
      <Accordion defaultActiveKey="0">
        {boletas.map((boleta, index) => (
          <Accordion.Item eventKey={String(index)} key={boleta.numero}>
            <Accordion.Header>
              <strong>Boleta N°: {boleta.numero}</strong>
              <span className="mx-3 text-muted">|</span>
              Cliente: {boleta.cliente.nombre} {boleta.cliente.apellidos}
              <span className="mx-3 text-muted">|</span>
              Fecha: {formatDateTime(boleta.fecha)}
            </Accordion.Header>
            <Accordion.Body>
              <Boleta data={boleta} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
        )}
    </main >
    </>
      );
}

export default GestionBoletas;