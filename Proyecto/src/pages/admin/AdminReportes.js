import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { getAllBoletas } from '../../data/boletasAPI';
import { getAllProducts } from '../../data/productsAPI';
import NavBar from '../../components/admin/AdminNavbar';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('es-CL');
};
const LOW_STOCK_THRESHOLD = 10;

function AdminReportes() {
  const [reportType, setReportType] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSalesReport = async () => {
    setLoading(true);
    setError(null);
    setReportData(null);
    try {
      const boletas = await getAllBoletas();
      if (!boletas || boletas.length === 0) {
        setReportData({ type: 'sales', message: 'No hay boletas para generar el reporte.' });
        return;
      }

      const totalSales = boletas.reduce((sum, b) => sum + b.resumen.total, 0);
      const totalOrders = boletas.length;
      const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

      const itemCounts = {};
      boletas.forEach(boleta => {
        boleta.items.forEach(item => {
          itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
      });
      const topItems = Object.entries(itemCounts)
        .sort(([, qtyA], [, qtyB]) => qtyB - qtyA)
        .slice(0, 5); // Top 5

      setReportData({
        type: 'sales',
        totalSales,
        totalOrders,
        averageOrderValue,
        topItems
      });

    } catch (err) {
      console.error("Error generando reporte de ventas:", err);
      setError("No se pudo generar el reporte de ventas.");
    } finally {
      setLoading(false);
    }
  };

  const generateStockReport = async () => {
    setLoading(true);
    setError(null);
    setReportData(null);
    try {
      const products = await getAllProducts();
      if (!products || products.length === 0) {
        setReportData({ type: 'stock', message: 'No hay productos para generar el reporte.' });
        return;
      }

      const lowStockProducts = products
        .filter(p => p.stock < LOW_STOCK_THRESHOLD)
        .sort((a, b) => a.stock - b.stock);

      const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

      setReportData({
        type: 'stock',
        lowStockProducts,
        totalProducts: products.length,
        totalInventoryValue
      });

    } catch (err) {
      console.error("Error generando reporte de stock:", err);
      setError("No se pudo generar el reporte de stock.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReport = (type) => {
    setReportType(type);
    if (type === 'sales') {
      generateSalesReport();
    } else if (type === 'stock') {
      generateStockReport();
    } else {
      setReportData(null);
    }
  };

  const renderReport = () => {
    if (loading) {
      return (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="purple" />
          <p className="mt-2">Generando reporte...</p>
        </div>
      );
    }
    if (error) {
      return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }
    if (!reportData) {
      return <Alert variant="info" className="mt-4">Seleccione un tipo de reporte para comenzar.</Alert>;
    }
    if (reportData.message) {
      return <Alert variant="warning" className="mt-4">{reportData.message}</Alert>;
    }


    if (reportData.type === 'sales') {
      return (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-purple text-white">Resumen de Ventas</Card.Header>
          <Card.Body>
            <Row className="mb-3 text-center">
              <Col md={4}>
                <h5>Total Ventas</h5>
                <p className="fs-4 text-success fw-bold">{formatCurrency(reportData.totalSales)}</p>
              </Col>
              <Col md={4}>
                <h5>Total Órdenes</h5>
                <p className="fs-4 fw-bold">{reportData.totalOrders}</p>
              </Col>
              <Col md={4}>
                <h5>Valor Promedio Orden</h5>
                <p className="fs-4 fw-bold">{formatCurrency(reportData.averageOrderValue)}</p>
              </Col>
            </Row>
            <hr />
            <h5>Top 5 Productos Más Vendidos (por cantidad)</h5>
            {reportData.topItems.length > 0 ? (
              <Table striped bordered size="sm">
                <thead>
                  <tr><th>Producto</th><th>Cantidad Vendida</th></tr>
                </thead>
                <tbody>
                  {reportData.topItems.map(([name, qty]) => (
                    <tr key={name}><td>{name}</td><td>{qty}</td></tr>
                  ))}
                </tbody>
              </Table>
            ) : <p className="text-muted">No hay datos suficientes.</p>}
          </Card.Body>
        </Card>
      );
    }

    if (reportData.type === 'stock') {
      return (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-warning text-dark">Reporte de Stock Crítico ({'<'} {LOW_STOCK_THRESHOLD} unidades)</Card.Header>
          <Card.Body>
            <Row className="mb-3 text-center">
              <Col md={6}>
                <h5>Productos Totales</h5>
                <p className="fs-4 fw-bold">{reportData.totalProducts}</p>
              </Col>
              <Col md={6}>
                <h5>Valor Total Inventario (aprox.)</h5>
                <p className="fs-4 text-primary fw-bold">{formatCurrency(reportData.totalInventoryValue)}</p>
              </Col>
            </Row>
            <hr />
            <h5>Productos con Bajo Stock</h5>
            {reportData.lowStockProducts.length > 0 ? (
              <Table striped bordered hover size="sm">
                <thead className="table-light">
                  <tr><th>ID</th><th>Producto</th><th>Stock Actual</th></tr>
                </thead>
                <tbody>
                  {reportData.lowStockProducts.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td className="text-danger fw-bold">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="success">¡Excelente! No hay productos con bajo stock.</Alert>
            )}
          </Card.Body>
        </Card>
      );
    }

    return null;
  };


  return (
    <>
      <NavBar />
      <main className="container my-5">
        <h1 className="text-purple mb-4">Generador de Reportes</h1>

        <Card className="shadow-sm border-0 mb-4">
          <Card.Body className="d-flex justify-content-center gap-3">
            <Button
              variant={reportType === 'sales' ? "purple" : "outline-purple"}
              onClick={() => handleSelectReport('sales')}
              disabled={loading}
            >
              <i className="bi bi-graph-up me-2"></i>Reporte de Ventas
            </Button>
            <Button
              variant={reportType === 'stock' ? "warning" : "outline-warning"}
              onClick={() => handleSelectReport('stock')}
              disabled={loading}
            >
              <i className="bi bi-box-seam me-2"></i>Reporte de Stock
            </Button>
          </Card.Body>
        </Card>

        {renderReport()}

      </main>
    </>
  );
}

export default AdminReportes;