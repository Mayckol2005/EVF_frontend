import React from 'react';
import { Link } from 'react-router-dom';

function BlogArmani() {
  return (
    <main className="container my-5">
      <article className="blog-post">
        <h1 className="text-purple fw-bold mb-3">Muere Giorgio Armani, el legendario diseñador italiano que revolucionó el mundo de la moda</h1>

        <figure className="my-4 text-center">
          <img 
            src="../../assets/img/Giorgio-Armani.webp" 
            className="img-fluid rounded shadow" 
            alt="Giorgio Armani en una de sus últimas apariciones"
          />
          <figcaption className="mt-2 text-muted">
            El diseñador italiano de 91 años falleció este jueves 04 de septiembre en Milán. <br />
          </figcaption>
        </figure>

        <p>Giorgio Armani, el afamado diseñador de moda italiano, murió este jueves a los 91 años en la ciudad de Milán, Italia, anunció la compañía que creó.</p>

        <blockquote className="blockquote bg-light p-3 rounded border-start border-3 border-purple my-4">
          “Con profundo pesar, el Grupo Armani anuncia el fallecimiento de su creador, fundador e incansable impulsor: Giorgio Armani”, declaró la casa de moda en un comunicado.
        </blockquote>

        <p>El diseñador presentaba problemas de salud desde hacía tiempo. En junio pasado, su condición lo forzó a abandonar, por primera vez en su carrera, los desfiles de la Semana de la Moda Masculina de Milán.</p>
        <p>Armani era sinónimo de estilo y elegancia, y se lo considera el primer diseñador desde Coco Chanel que provocó un cambio duradero en la forma de vestir.</p>
        <p>Nacido en la época de la preguerra, caracterizada por tradiciones y estilos rígidos, las creaciones de Armani contribuyeron a posibilitar la creciente fluidez social de la segunda mitad del siglo XX.</p>

        <h2 className="text-purple mt-5">Oferta especial en su memoria</h2>
        <p>
          En <strong>DuocFragancias</strong> queremos rendir homenaje a este ícono de la moda: durante todo este mes, <strong>todos los perfumes Armani tendrán un 5% de descuento</strong> en nuestra tienda online.
        </p>

        <Link to="/blogs" className="btn btn-outline-purple mt-4">← Volver a Blogs</Link>
      </article>
    </main>
  );
}

export default BlogArmani;
