import React from 'react';
import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    <main className="container my-5">
      <h1 className="text-purple fw-bold mb-4 text-center">Sobre Nosotros</h1>

      <section className="mb-5">
        <h3 className="text-purple">Nuestro Origen</h3>
        <p>
          <strong>DuocFragancias</strong> nació como un proyecto de estudiantes apasionados por el mundo de la perfumería y la tecnología.
          Con el objetivo de acercar las mejores fragancias nacionales e internacionales a cada rincón de Chile,
          desarrollamos esta tienda digital como un puente entre las grandes marcas y nuestros clientes.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="text-purple">Nuestra Misión</h3>
        <p>
          Ofrecer perfumes originales y de calidad a precios competitivos, garantizando una experiencia de compra segura,
          confiable y cercana. Buscamos que cada aroma acompañe a nuestros clientes en los momentos más importantes de su vida.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="text-purple">Nuestra Visión</h3>
        <p>
          Ser la tienda online de referencia en Chile en el mundo de la perfumería, reconocida por su
          <em> excelente atención al cliente</em>, su compromiso con la calidad y su capacidad de innovar en la forma de conectar a las personas con fragancias que inspiran y perduran en el tiempo.
        </p>
      </section>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-purple">← Volver al Inicio</Link>
      </div>
    </main>
  );
}

export default Nosotros;
