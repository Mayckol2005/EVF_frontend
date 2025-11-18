import React from 'react';
import { Link } from 'react-router-dom';

function BlogCarolina() {
  return (
    <main className="container my-5">
      <article className="blog-post">
        <h1 className="text-purple fw-bold mb-3">
          Los tres mejores perfumes de Carolina Herrera para mujer, según reportes de inteligencia artificial
        </h1>
        <figure className="my-4 text-center">
          <img 
            src="../../assets/img/CHPerfumesMujer.webp" 
            className="img-fluid rounded shadow" 
            alt="Perfumes Carolina Herrera"
          />
          <figcaption className="mt-2 text-muted">
            Good Girl, 212 y CH figuran entre los perfumes más icónicos de la marca. <br />
          </figcaption>
        </figure>

        <p>Elegir el perfume ideal depende de la ocasión y de quien lo usa, ya que hay opciones frescas para el día, intensas para la noche y fragancias versátiles que funcionan en cualquier momento, adaptándose a distintos estilos de vida.</p>

        <h2 className="text-purple mt-5">Mejores perfumes Carolina Herrera para mujer</h2>

        <h5 className="fw-bold mt-4">1. Good Girl</h5>
        <p>Good Girl es un perfume audaz y sofisticado con su famoso frasco en forma de zapato de tacón. Combina notas dulces y amaderadas que lo hacen ideal para mujeres seguras y elegantes que buscan destacar tanto en eventos nocturnos como en ocasiones especiales.</p>

        <h5 className="fw-bold mt-4">2. 212 & 212 VIP</h5>
        <p>Estas fragancias ofrecen aromas frescos y modernos con un toque urbano, perfectos para mujeres activas que buscan una fragancia versátil que acompañe su ritmo diario. Su estela elegante y duradera las convierte en una elección confiable para cualquier entorno.</p>

        <h5 className="fw-bold mt-4">3. CH</h5>
        <p>CH Carolina Herrera es un clásico floral con toques orientales que transmite sofisticación y calidez. Es ideal para quienes prefieren un aroma atemporal que se adapta a diferentes estaciones y proyecta una imagen refinada y femenina.</p>

        <figure className="my-4 text-center">
          <img 
            src="../../assets/img/CHPerfumesHombre.avif" 
            className="img-fluid rounded shadow" 
            alt="Perfumes Carolina Herrera Masculinos"
          />
          <figcaption className="mt-2 text-muted">
            En el catálogo masculino destacan Bad Boy, 212 NYC Man, 212 Heroes y Bad Boy Cobalt. <br />
          </figcaption>
        </figure>

        <h2 className="text-purple mt-5">Perfumes masculinos destacados</h2>
        <p>En el catálogo masculino también hay opciones icónicas:</p>
        <ul>
          <li><strong>Bad Boy:</strong> con notas picantes y frasco en forma de rayo.</li>
          <li><strong>212 NYC Man:</strong> aroma amaderado y fresco.</li>
          <li><strong>212 Heroes:</strong> con toques frutales y cuero.</li>
          <li><strong>Bad Boy Cobalt:</strong> perfecto para ocasiones nocturnas y climas frescos.</li>
        </ul>

        <Link to="/blogs" className="btn btn-outline-purple mt-4">← Volver a Blogs</Link>
      </article>
    </main>
  );
}

export default BlogCarolina;
