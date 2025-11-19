import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

describe('Pruebas de Estado y Renderizado Condicional (Login)', () => {

  const renderLogin = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it('debe actualizar el estado (valor) del input cuando el usuario escribe', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'usuario@test.com' } });
    
    expect(emailInput.value).toBe('usuario@test.com');
  });

  it('NO debe mostrar un mensaje de error al renderizar inicialmente', () => {
    renderLogin();
    
    const mensajeError = screen.queryByText('Credenciales inválidas.'); 
    expect(mensajeError).toBeNull();
  });


  it('DEBE mostrar un mensaje de error condicional si el login falla', async () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'usuario@incorrecto.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    const botonIngresar = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(botonIngresar);

    const mensajeError = await screen.findByText(/Credenciales inválidas/i);

    expect(mensajeError).not.toBeNull();
  });
});