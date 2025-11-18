import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Pruebas del componente App', () => {
    it('Contiene rutas principales del sitio', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // 🎯 CAMBIO AQUÍ:
        // Usamos 'getAllByRole' para buscar todos los links (<a>)
        // que tengan el nombre accesible (texto) "Inicio".
        // 'getAllBy...' (plural) nos devuelve un array y no falla si encuentra varios.
        const homeLinks = screen.getAllByRole('link', { name: /Inicio/i });

        // Verificamos que al menos uno de esos links exista
        expect(homeLinks.length).toBeGreaterThan(0);
    });
});