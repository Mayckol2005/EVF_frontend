// src/components/Boleta.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Boleta from './Boleta';

describe('Pruebas de Renderizado de Listas (Boleta)', () => {

  // 1. Creamos un set de datos falsos (mock data)
  const mockBoletaData = {
    numero: 'BOL-123456',
    fecha: new Date().toISOString(),
    cliente: {
      nombre: 'Juan',
      apellidos: 'Pérez',
      correo: 'juan@perez.cl',
      calle: 'Av. Falsa 123',
      comuna: 'Santiago',
      region: 'Metropolitana'
    },
    // La lista que queremos probar:
    items: [
      { id: 1, name: 'Perfume Caro', quantity: 1, price: 50000 },
      { id: 2, name: 'Perfume Casi Caro', quantity: 2, price: 5000 },
      { id: 3, name: 'Perfume Barato', quantity: 1, price: 2500 },
    ],
    resumen: {
      subtotal: 62500,
      envio: 0,
      total: 62500
    }
  };

  // Tarea: Pruebas de Renderizado 
  it('debe renderizar todos los elementos de la lista de items', () => {
    // 2. Renderizamos el componente pasándole los datos (props)
    render(<Boleta data={mockBoletaData} />);
    
    // 3. Verificamos que los elementos de la lista se renderizaron
    
    // Buscamos el texto del primer producto
    expect(screen.getByText('Perfume Caro')).not.toBeNull();
    
    // Buscamos el texto del segundo producto
    expect(screen.getByText('Perfume Casi Caro')).not.toBeNull();
    
    // Buscamos el texto del tercer producto
    expect(screen.getByText('Perfume Barato')).not.toBeNull();

    // 4. (Forma más avanzada) Verificamos la cantidad de filas
    // Buscamos la tabla, luego su 'tbody', y contamos sus 'tr' (filas)
    const tabla = screen.getByRole('table');
    const cuerpoTabla = tabla.querySelector('tbody');
    const filasDeItems = cuerpoTabla.querySelectorAll('tr');
    
    // Verificamos que el número de filas sea igual al de nuestros datos
    expect(filasDeItems.length).toBe(mockBoletaData.items.length);
  });
});