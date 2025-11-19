import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { getAllUsers } from '../../data/usersAPI';
import { getAllBoletas } from '../../data/boletasAPI';
import Boleta from '../../components/Boleta'; 
import NavBar from '../../components/admin/AdminNavbar'; 

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};
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

function GestionClientes() {
  const [clientesConHistorial, setClientesConHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("GestionClientes: Cargando datos...");

        // 1. Obtenemos todos los usuarios y todas las boletas
        const [allUsers, allBoletas] = await Promise.all([
          getAllUsers(),
          getAllBoletas()
        ]);

        // --- 2. CONSOLE.LOGS PARA DEPURACIÓN ---
        console.log("GestionClientes: Usuarios recibidos:", allUsers);
        console.log("GestionClientes: Boletas recibidas:", allBoletas);
        // ----------------------------------------

        // 3. Filtramos solo los usuarios que son 'cliente'
        const clientes = allUsers.filter(u => u.tipo === 'cliente');
        console.log("GestionClientes: Clientes filtrados:", clientes);

        // 4. Cruzamos los datos
        const historialCompleto = clientes.map(cliente => {
          
          const boletasDelCliente = allBoletas
            .filter(boleta => boleta.cliente.correo === (cliente.email || cliente.correo))
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); 

          const gastoTotal = boletasDelCliente.reduce((sum, b) => sum + b.resumen.total, 0);

          return {
            ...cliente,
            boletas: boletasDelCliente,
            gastoTotal: gastoTotal
          };
        });
        
        historialCompleto.sort((a, b) => b.boletas.length - a.boletas.length);
        console.log("GestionClientes: Historial final:", historialCompleto);

        setClientesConHistorial(historialCompleto);

      } catch (err) {
        console.error("Error al cargar historial de clientes:", err);
        setError("No se pudo cargar la información de los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border text-purple" role="status">
            <span className="visually-hidden">Cargando clientes...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="container p-4"><div className="alert alert-danger">{error}</div></div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="container my-5">
        <h1 className="text-purple mb-4">Historial de Compras por Cliente</h1>
        
        {clientesConHistorial.length === 0 ? (
          <div className="alert alert-info text-center">
            <p className="h5">No se encontraron clientes con historial de compras.</p>
            <p className="mb-0">Asegúrate de que haya usuarios de tipo "cliente" y que hayan completado compras.</p>
            <hr />
            <small className="text-muted">Revisa la consola del navegador (F12) para ver los datos crudos que se cargaron (usuarios y boletas).</small>
          </div>
        ) : (
          <Accordion>
            {clientesConHistorial.map((cliente) => (
              <Accordion.Item eventKey={String(cliente.id)} key={cliente.id}>
                <Accordion.Header>
                  <strong>{cliente.nombre}</strong>
                  <span className="mx-3 text-muted">|</span>
                  {cliente.email || cliente.correo} {/* Mostramos cualquiera que exista */}
                  <span className="ms-auto me-3 p-2 badge bg-purple rounded-pill">
                    {cliente.boletas.length} {cliente.boletas.length === 1 ? 'Compra' : 'Compras'}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  {cliente.boletas.length === 0 ? (
                    <p className="text-muted text-center">Este cliente aún no tiene historial de compras.</p>
                  ) : (
                    <>
                      <h5 className="mb-3">
                        Gasto Total Histórico: 
                        <strong className="text-success ms-2">{formatCurrency(cliente.gastoTotal)}</strong>
                      </h5>
                      
                      <Accordion defaultActiveKey="0">
                        {cliente.boletas.map((boleta, index) => (
                          <Accordion.Item eventKey={String(index)} key={boleta.numero}>
                            <Accordion.Header>
                              <strong>Boleta N°: {boleta.numero}</strong>
                              <span className="mx-3 text-muted">|</span>
                              Fecha: {formatDateTime(boleta.fecha)}
                              <span className="mx-3 text-muted">|</span>
                              Total: {formatCurrency(boleta.resumen.total)}
                            </Accordion.Header>
                            <Accordion.Body>
                              <Boleta data={boleta} />
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </main>
    </>
  );
}

export default GestionClientes;