import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBoletas } from '../../data/boletasAPI';
import { getAllProducts } from '../../data/productsAPI';
import { getAllUsers } from '../../data/usersAPI';
import '../../styles/AdminDashboard.css';
import NavBar from '../../components/admin/AdminNavbar';
import { Spinner } from 'react-bootstrap';

const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
const LOW_STOCK_THRESHOLD = 10;

function AdminDashboard() {
  const [stats, setStats] = useState({
    ventasTotales: 0,
    totalBoletas: 0,
    totalClientes: 0,
    stockTotal: 0
  });
  const [recentBoletas, setRecentBoletas] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, boletasData, usersData] = await Promise.all([
          getAllProducts(),
          getAllBoletas(), // Llama a la API (ahora devuelve ordenado)
          getAllUsers()
        ]);

        // --- Log para verificar datos ---
        console.log("Boletas recibidas en Dashboard (ordenadas?):", boletasData);
        // -----------------------------

        // Calcular con boletasData
        const ventasTotales = boletasData.reduce((sum, boleta) => sum + (boleta.resumen?.total || 0), 0); // Añadido ?.total para seguridad
        const totalBoletas = boletasData.length;
        const totalClientes = usersData.filter(u => u.tipo === 'cliente').length;
        const stockTotal = productsData.reduce((sum, product) => sum + (parseInt(product.stock, 10) || 0), 0);

        // Actualizar estado
        setStats({ ventasTotales, totalBoletas, totalClientes, stockTotal });

        // Mostrar últimas 5 boletas (slice sobre la lista ya ordenada)
        const ultimasCinco = boletasData.slice(0, 5);
        console.log("Últimas 5 boletas para mostrar:", ultimasCinco); // Log del slice
        setRecentBoletas(ultimasCinco);

        // Procesar bajo stock
        const bajoStock = productsData
          .filter(p => (parseInt(p.stock, 10) || 0) < LOW_STOCK_THRESHOLD) // Asegurar número
          .sort((a, b) => (parseInt(a.stock, 10) || 0) - (parseInt(b.stock, 10) || 0)); // Asegurar número
        setLowStockProducts(bajoStock);

      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    try {
      // Usar formato más completo para depurar
      return new Date(isoString).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    } catch {
      return 'Fecha inválida';
    }
  };

  // getStatusBadge se quita si no aplica a boletas
  // const getStatusBadge = (estado) => { ... };


  if (loading) {
    return (
      <>
        <NavBar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Spinner animation="border" variant="purple" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid p-4">
        <h1 className="h2 mb-4">Dashboard de Administración</h1>

        {/* --- Fila de Tarjetas --- */}
        <div className="row g-4 mb-4">
          {/* Ventas Totales */}
          <div className="col-md-6 col-xl-3">
            <div className="card shadow-sm border-0 stat-card h-100">
              <div className="card-body">
                <h5 className="card-title text-uppercase text-muted mb-2">Ventas Totales</h5>
                <span className="h3 fw-bold">{formatCurrency(stats.ventasTotales)}</span>
              </div>
            </div>
          </div>
          {/* Total Boletas */}
          <div className="col-md-6 col-xl-3">
            <div className="card shadow-sm border-0 stat-card h-100">
              <div className="card-body">
                <h5 className="card-title text-uppercase text-muted mb-2">Total Boletas</h5>
                {/* Usar stats.totalBoletas */}
                <span className="h3 fw-bold">{stats.totalBoletas}</span>
              </div>
            </div>
          </div>
          {/* Total Clientes */}
          <div className="col-md-6 col-xl-3">
            <div className="card shadow-sm border-0 stat-card h-100">
              <div className="card-body">
                <h5 className="card-title text-uppercase text-muted mb-2">Total Clientes</h5>
                <span className="h3 fw-bold">{stats.totalClientes}</span>
              </div>
            </div>
          </div>
          {/* Stock Total */}
          <div className="col-md-6 col-xl-3">
            <div className="card shadow-sm border-0 stat-card h-100">
              <div className="card-body">
                <h5 className="card-title text-uppercase text-muted mb-2">Productos (Stock Total)</h5>
                <span className="h3 fw-bold">{stats.stockTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Fila de Tablas --- */}
        <div className="row g-4">
          {/* Últimas Boletas */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Últimas Boletas Generadas</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>N° Boleta</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        {/* <th>Estado</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- Usar recentBoletas --- */}
                      {recentBoletas.length > 0 ? recentBoletas.map(boleta => (
                        <tr key={boleta?.numero || Math.random()}> {/* Añadir fallback key */}
                          <td>{boleta?.numero || 'N/A'}</td>
                          <td>{`${boleta?.cliente?.nombre || ''} ${boleta?.cliente?.apellidos || ''}`}</td>
                          <td>{formatDate(boleta?.fecha)}</td>
                          <td>{formatCurrency(boleta?.resumen?.total || 0)}</td>
                          {/* <td>{getStatusBadge(boleta.estado)}</td> */}
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-3">No hay boletas recientes para mostrar.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="col-lg-4">
            {/* Tarjeta Gestión Rápida */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-purple text-white"><h5 className="mb-0">Gestión Rápida</h5></div>
              <div className="card-body"><div className="d-grid gap-2">
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/productos" className="btn btn-outline-purple">Gestionar Productos</Link>
                    <Link to="/admin/boletas" className="btn btn-outline-purple">Ver Boletas</Link>
                    <Link to="/admin/usuarios" className="btn btn-outline-purple">Gestionar Usuarios</Link>
                  </div>
                </div>
              </div></div>

            </div>
            {/* Tarjeta Bajo Stock */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-warning text-dark"><h5 className="mb-0">¡Productos con Stock Crítico!</h5></div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead><tr><th>Producto</th><th className="text-end">Stock</th></tr></thead>
                    <tbody>
                      {lowStockProducts.length > 0 ? lowStockProducts.map(product => (
                        <tr key={product.id}>
                          <td><Link to={`/admin/producto/editar/${product.id}`} title={`Editar ${product.name}`}>{product.name}</Link></td>
                          <td className="text-end"><span className="fw-bold text-danger">{product.stock}</span></td>
                        </tr>
                      )) : (
                        <tr><td colSpan="2" className="text-center text-muted py-3">No hay productos con bajo stock.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
