import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR809Q4Aq9sAyaug7uoTFzyiVPUIvCllt76Vw&s',
    title: 'Fragancia Nocturna',
    description: 'Ideal para ocasiones especiales y eventos nocturnos.',
    price: '34.990'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3',
    title: 'Esencia Fresca',
    description: 'Notas cítricas y frescas para el día a día.',
    price: '29.990'
  },
  {
    imageUrl: 'https://i5.walmartimages.com/asr/2e062367-ebdc-47d9-a1d6-31593e838427.8f53dc1eb2ce05c9700d2e8f7a89f3b4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    title: 'Aroma Elegante',
    description: 'Fragancia sofisticada con notas amaderadas.',
    price: '39.990'
  }
];

function FeaturedProducts() {
  return (
    <section className="productos-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-purple">Productos Destacados</h2>
        <div className="row g-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="/tienda" className="btn btn-outline-purple">Ver Todos los Productos</a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;