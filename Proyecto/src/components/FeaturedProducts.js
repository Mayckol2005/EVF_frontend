import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1659167664742-a592e00f5a29?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fragancia Amaderada Oriental',
    description: 'Eros Eau de Parfum de Versace: una fragancia audaz y seductora que combina frescura cítrica y sensualidad amaderada para el hombre seguro que deja huella.',
    price: '152.990'
  },
  {
    imageUrl: 'https://www.allbeauty.com/images?url=https://static.thcdn.com/productimg/original/15059499-1335265776407563.jpg&format=webp&auto=avif&width=1000&height=1000&fit=cover',
    title: 'Aroma Profundo y Seductor',
    description: 'Phantom Intense de Rabanne: un aroma ambarino y audaz con lavanda, salvia y ron que redefine la masculinidad del hombre moderno.',
    price: '123.990'
  },
  {
    imageUrl: 'https://fast-shop.ge/wp-content/uploads/2021/02/9b180736813493.572a241d94162.jpg',
    title: 'Fresco y Elegancia Absoluta',
    description: 'Bleu de Chanel: un aroma aromático-amaderado que encarna la libertad y la elegancia en un azul profundo y cautivador.',
    price: '148.500'
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