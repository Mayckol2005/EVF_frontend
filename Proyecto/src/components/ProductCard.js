import React from 'react';

// Recibimos los datos (imagen, título, etc.) como props
function ProductCard({ imageUrl, title, description, price }) {
  return (
    <div className="col-md-4">
      <div className="card card-producto h-100">
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="producto-precio">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;