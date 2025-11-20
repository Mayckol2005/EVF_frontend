import React from 'react';

// Función para formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

// Función para formatear fecha
const formatDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// COMPONENTE SIMPLE (Solo recibe datos y los muestra)
function Boleta({ data }) {
  // Si no hay datos, no mostramos nada
  if (!data) return null;

  const { numero, fecha, cliente, items, resumen } = data;

  return (
    // Este div es el que se imprimirá. Tiene estilos en línea para asegurar que se vea bien en el PDF.
    <div id="boleta-pdf-content" className="p-5 bg-white text-dark" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd' }}>
      
      {/* --- Encabezado --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0" style={{ color: '#34495e' }}>DuocFragancias</h2>
          <small className="text-muted">Lo mejor en perfumería internacional</small>
          <br />
          <small>Puerto Montt, Chile</small>
        </div>
        <div className="text-end">
          <h5 className="mb-1 fw-bold text-uppercase">Boleta Electrónica</h5>
          <span className="d-block mb-1" style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>N° {numero}</span>
          <small className="text-muted">Fecha: {formatDateTime(fecha)}</small>
        </div>
      </div>

      {/* --- Datos del Cliente --- */}
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <h6 className="fw-bold text-uppercase text-secondary mb-3" style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Información del Cliente</h6>
        <div className="row">
          <div className="col-6">
            <p className="mb-1"><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
            <p className="mb-1"><strong>RUT:</strong> {cliente.rut || 'N/A'}</p>
          </div>
          <div className="col-6">
            <p className="mb-1"><strong>Email:</strong> {cliente.correo}</p>
            <p className="mb-0"><strong>Dirección:</strong> {cliente.direccion || cliente.calle || 'Retiro en tienda'}</p>
            {(cliente.comuna || cliente.region) && (
               <small className="text-muted">{cliente.comuna}, {cliente.region}</small>
            )}
          </div>
        </div>
      </div>

      {/* --- Tabla de Productos --- */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#34495e', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Descripción</th>
              <th className="text-center" style={{ padding: '10px' }}>Cant.</th>
              <th className="text-end" style={{ padding: '10px' }}>Precio Unit.</th>
              <th className="text-end" style={{ padding: '10px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.name}</td>
                <td className="text-center" style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.quantity}</td>
                <td className="text-end" style={{ padding: '10px', border: '1px solid #dee2e6' }}>{formatCurrency(item.price)}</td>
                <td className="text-end fw-bold" style={{ padding: '10px', border: '1px solid #dee2e6' }}>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Totales --- */}
      <div className="row justify-content-end">
        <div className="col-5">
          <table className="table table-borderless" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td className="text-end" style={{ padding: '5px' }}>Subtotal:</td>
                <td className="text-end fw-bold" style={{ padding: '5px' }}>{formatCurrency(resumen.subtotal)}</td>
              </tr>
              <tr>
                <td className="text-end" style={{ padding: '5px' }}>Envío:</td>
                <td className="text-end fw-bold" style={{ padding: '5px' }}>{resumen.envio === 0 ? "Gratis" : formatCurrency(resumen.envio)}</td>
              </tr>
              <tr style={{ borderTop: '2px solid #333' }}>
                <td className="text-end fs-4 fw-bold pt-3" style={{ color: '#34495e' }}>TOTAL:</td>
                <td className="text-end fs-4 fw-bold pt-3" style={{ color: '#34495e' }}>{formatCurrency(resumen.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Pie de página --- */}
      <div className="text-center mt-5 pt-4 border-top text-muted small">
        <p className="mb-1">¡Gracias por preferir DuocFragancias!</p>
        <p className="mb-0">Documento válido como comprobante de compra. | contacto@duocfragancias.cl</p>
      </div>
    </div>
  );
}

export default Boleta;