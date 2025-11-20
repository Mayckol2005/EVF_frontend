import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Importa la nueva función
import { getDashboardStats } from '../../data/boletasAPI'; 
import '../../styles/AdminDashboard.css';
import NavBar from '../../components/admin/AdminNavbar';

const formatCurrency = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

function AdminDashboard() {
  const [stats, setStats] = useState({
    ventasTotales: 0,
    totalBoletas: 0,
    totalClientes: 0,
    productosBajoStock: [] // Ahora viene directo del backend
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ¡Llamada optimizada al Backend!
        const data = await getDashboardStats();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando Dashboard...</div>;

  return (
    <>
      <NavBar />
      <main className="container my-5">
        <h1 className="text-purple mb-4">Panel de Control</h1>

        {/* Tarjetas de Resumen */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card stat-card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted">Ventas Totales</h5>
                <h2 className="display-6 fw-bold text-purple">{formatCurrency(stats.ventasTotales)}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
             <div className="card stat-card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted">Órdenes Realizadas</h5>
                <h2 className="display-6 fw-bold text-purple">{stats.totalBoletas}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
             <div className="card stat-card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-muted">Usuarios Registrados</h5>
                <h2 className="display-6 fw-bold text-purple">{stats.totalClientes}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Stock Crítico */}
        <div className="card shadow-sm border-0">
           <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">⚠️ Productos con Stock Crítico (Menor a 10)</h5>
           </div>
           <div className="card-body p-0">
              <table className="table table-hover mb-0">
                 <thead>
                    <tr>
                       <th>Producto</th>
                       <th className="text-end">Stock</th>
                    </tr>
                 </thead>
                 <tbody>
                    {stats.productosBajoStock.length > 0 ? (
                       stats.productosBajoStock.map(p => (
                          <tr key={p.id}>
                             <td>{p.name}</td>
                             <td className="text-end fw-bold text-danger">{p.stock}</td>
                          </tr>
                       ))
                    ) : (
                       <tr><td colSpan="2" className="text-center py-3">Todo el inventario está saludable.</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;