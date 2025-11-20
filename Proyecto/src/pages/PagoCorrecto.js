import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Boleta from '../components/Boleta';
import '../styles/pago.css';

function PagoCorrecto() {
  const location = useLocation();
  // Recuperamos los datos que vienen desde Comprar.js
  const boletaData = location.state?.boletaData; 
  const [emailMessage, setEmailMessage] = useState(null); 

  // --- FUNCIÓN DE IMPRESIÓN NATIVA ---
  // Abre el diálogo de impresión del navegador (Guardar como PDF).
  // Gracias al CSS en 'pago.css', solo se verá la sección de la boleta.
  const handlePrint = () => {
    window.print();
  };

  // Simulación de envío de correo
  const handleSendEmail = () => {
    if (!boletaData) return;
    const emailDestino = window.prompt(
      "Ingrese el correo al que desea enviar la boleta:",
      boletaData.cliente.correo
    );
    if (emailDestino) {
      setEmailMessage({ type: 'success', text: `Boleta enviada (simulado) a ${emailDestino}.` });
    }
  };

  return (
    <div className="container my-5 text-center pago-container">
      
      {/* CONTENIDO VISIBLE EN PANTALLA 
        La clase 'd-print-none' (de Bootstrap) oculta todo este bloque al imprimir.
      */}
      <div className="row justify-content-center d-print-none"> 
        <div className="col-md-8">
          <div className="card shadow-lg p-4">

            <div className="card-body">
              <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
              <h2 className="text-success fw-bold mb-3">¡Pago Exitoso!</h2>
              
              {boletaData ? (
                <>
                  <p className="lead">
                    Gracias por tu compra. Hemos recibido tu pedido correctamente.
                    <span className="d-block fw-bold mt-2">Boleta N°: {boletaData.numero}</span>
                  </p>

                  {emailMessage && (
                    <div className={`alert alert-${emailMessage.type} mt-3`} role="alert">
                      {emailMessage.text}
                    </div>
                  )}

                  <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
                    
                    {/* Botón que activa la impresión nativa */}
                    <button onClick={handlePrint} className="btn btn-purple btn-lg">
                      <i className="bi bi-printer-fill me-2"></i>
                      Descargar Boleta (PDF)
                    </button>

                    <button onClick={handleSendEmail} className="btn btn-success btn-lg">
                      <i className="bi bi-envelope-fill me-2"></i>
                      Enviar por Email
                    </button>

                    <Link to="/" className="btn btn-outline-secondary btn-lg">
                      Volver al Inicio
                    </Link>
                  </div>
                </>
              ) : (
                <div className="alert alert-warning">
                  No hay datos de boleta para mostrar. <Link to="/">Volver a la tienda</Link>.
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN EXCLUSIVA PARA IMPRESIÓN 
        - 'id="section-to-print"': El CSS usa este ID para hacerlo visible en @media print.
        - 'd-none': Oculto en pantalla normal.
        - 'd-print-block': Visible al imprimir (Bootstrap).
      */}
      <div id="section-to-print" className="d-none d-print-block">
        {boletaData && <Boleta data={boletaData} />}
      </div>

    </div>
  );
}

export default PagoCorrecto;