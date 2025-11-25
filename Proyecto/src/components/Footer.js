import React from 'react';

// Footer del sitio con información de contacto y enlaces rápidos
function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h5>Tienda DuocFragancias</h5>
            <p>La mejor selección de perfumes con entrega a todo Chile.</p>
          </div>

          <div className="col-md-4">
            <h5>Contacto</h5>
            <p>
              Email: contacto@tiendaduocpm.cl<br />
              Teléfono: +56 9 1234 5678
            </p>
          </div>

          <div className="col-md-4">
            <h5>Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Inicio</a></li>
              <li><a href="tienda" className="text-white">Productos</a></li>
              <li><a href="contacto" className="text-white">Contacto</a></li>
              <li><a href="nosotros" className="text-white">Nosotros</a></li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-3">
          <p>&copy; 2025 Tienda DuocFragancias. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
