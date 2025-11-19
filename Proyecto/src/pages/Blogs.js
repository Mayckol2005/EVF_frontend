import React from 'react';
import { Link } from 'react-router-dom';

function Blogs() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-purple">Últimas Noticias</h1>
        <div className="row g-4">
          {/* --- Tarjeta de Blog 1 --- */}
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <img 
                src="../../assets/img/Giorgio-Armani.webp" 
                className="card-img-top" 
                alt="Giorgio Armani" 
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-purple">Adiós a Giorgio Armani</h3>
                <p className="card-text">
                  Un ícono de la moda y la perfumería nos deja. En su memoria, perfumes Armani con <strong>5% de descuento</strong> esta semana.
                </p>
                <Link to="/blog/armani" className="btn btn-purple mt-auto align-self-start">Leer más</Link>
              </div>
            </div>
          </div>

          {/* --- Tarjeta de Blog 2 --- */}
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <img 
                src="../../assets/img/CHPerfumesMujer.webp" 
                className="card-img-top" 
                alt="Carolina Herrera" 
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-purple">Los tres mejores perfumes de Carolina Herrera</h3>
                <p className="card-text">
                  Good Girl, 212 y CH: fragancias icónicas según la inteligencia artificial.
                </p>
                <Link to="/blog/carolina" className="btn btn-purple mt-auto align-self-start">Leer más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;

