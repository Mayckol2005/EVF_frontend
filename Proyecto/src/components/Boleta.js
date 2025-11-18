import React from 'react';

// Función para formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

// Función para formatear fecha 
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

// Componente de función normal
const Boleta = ({ data }) => {

  if (!data) return null;

  const { numero, fecha, cliente, items, resumen } = data;

  return (

    <div className="boleta-imprimible p-4 border rounded">

      {/* --- Encabezado --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-purple mb-0">Perfumería "DuocFragancias"</h2>
          <span className="text-muted">Tu tienda de fragancias</span>
        </div>
        <div className="text-end">
          <h5 className="mb-1">BOLETA N°:</h5>
          <span className="font-monospace">{numero}</span>
        </div>
      </div>

      <hr />

      {/* --- Datos del Cliente y Compra --- */}
      <div className="row mb-4">
        <div className="col-sm-6">
          <strong>Fecha de Compra:</strong> {formatDateTime(fecha)}
        </div>
        <div className="col-sm-6">
          <strong>Cliente:</strong> {cliente.nombre} {cliente.apellidos}
        </div>
        <div className="col-sm-6">
          <strong>Email:</strong> {cliente.correo}
        </div>
        <div className="col-sm-6">
          <strong>Dirección de Envío:</strong> {cliente.calle}, {cliente.departamento && `${cliente.departamento}, `} {cliente.comuna}, {cliente.region}
        </div>
      </div>

      {/* --- Tabla de Productos --- */}
      <h5 className="text-purple">Detalle de la Compra</h5>
      <table className="table table-sm table-striped">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th className="text-center">Cant.</th>
            <th className="text-end">P. Unitario</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-end">{formatCurrency(item.price)}</td>
              <td className="text-end">{formatCurrency(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
        {/* --- Totales --- */}
        <tfoot className="fw-bold">
          <tr>
            <td colSpan="3" className="text-end">Subtotal</td>
            <td className="text-end">{formatCurrency(resumen.subtotal)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end">Envío</td>
            <td className="text-end">{resumen.envio === 0 ? "Gratis" : formatCurrency(resumen.envio)}</td>
          </tr>
          <tr className="fs-5 table-secondary">
            <td colSpan="3" className="text-end text-purple">TOTAL PAGADO</td>
            <td className="text-end text-purple">{formatCurrency(resumen.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Boleta;