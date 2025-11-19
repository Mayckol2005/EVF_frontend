// src/components/BotonSimple.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BotonSimple from './BotonSimple';

describe('Pruebas de Propiedades (Props) y Eventos', () => {

  let mockOnClick; // Variable para nuestro "espía"
  const etiquetaBoton = 'Hacer Clic';

  beforeEach(() => {
    // 1. Creamos un "espía" de Jasmine. Es una función falsa que
    // rastrea si fue llamada, cuántas veces, etc.
    mockOnClick = jasmine.createSpy('onClickSpy');

    // 2. Renderizamos el componente pasándole las props
    render(
      <BotonSimple
        etiqueta={etiquetaBoton}
        onClick={mockOnClick}
      />
    );
  });

  // Tarea: Pruebas de Propiedades (Props)
  it('debe recibir y renderizar la etiqueta (prop) correctamente', () => {
    // Buscamos el botón por su texto (que vino de la prop 'etiqueta')
    const boton = screen.getByText(etiquetaBoton);

    // Verificamos que el botón existe
    expect(boton).not.toBeNull();
    // Verificamos que el texto es el correcto
    expect(boton.textContent).toBe(etiquetaBoton);
  });

  // Tarea: Pruebas de Eventos
  it('debe llamar a la función (prop) onClick al ser presionado', () => {
    // 1. Buscamos el botón
    const boton = screen.getByText(etiquetaBoton);

    // 2. Simulamos el evento de clic del usuario
    fireEvent.click(boton);

    // 3. Verificamos (Jasmine) que nuestro "espía" fue llamado
    expect(mockOnClick).toHaveBeenCalled();

    // 4. (Opcional) Verificar que fue llamado solo una vez
    expect(mockOnClick.calls.count()).toBe(1);
  });
});