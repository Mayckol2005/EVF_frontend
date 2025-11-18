// src/components/BotonSimple.js
import React from 'react';

// Un componente simple solo para demostrar las pruebas de props y eventos.
// Recibe una "etiqueta" (prop) y una función "onClick" (prop).
function BotonSimple({ etiqueta, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-primary">
      {etiqueta || 'Botón'}
    </button>
  );
}

export default BotonSimple;