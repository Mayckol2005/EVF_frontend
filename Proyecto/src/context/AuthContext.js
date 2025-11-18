import React, { createContext, useContext, useState, useEffect } from 'react';
// Importamos AMBAS funciones de nuestra API de usuarios
import { getAllUsers, createUser } from '../data/usersAPI';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado para el usuario actual.
  // Esta parte es de leer/guardar en sessionStorage.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = sessionStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Función para iniciar sesión
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      getAllUsers().then(users => {
        // Buscamos al usuario en nuestra API simulada
        const user = users.find(u => u.correo === email && u.password === password);

        if (user) {
          // No guardamos la contraseña en el estado por seguridad
          const { password: _, ...userToStore } = user;
          setCurrentUser(userToStore);
          resolve(userToStore); // Devolvemos el usuario
        } else {
          // No encontrado
          reject(new Error('Credenciales inválidas.'));
        }
      });
    });
  };

  // Función para registrar un nuevo usuario
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Aseguramos que el tipo siempre sea 'cliente'
      const fullUserData = {
        ...userData,
        tipo: 'cliente'
      };
      // Llamamos a la API para CREAR el usuario (guardar en localStorage)
      createUser(fullUserData)
        .then(newUser => {
          // Si la API tuvo éxito (usuario creado):
          // 1. Iniciar sesión inmediatamente
          const { password: _, ...userToStore } = newUser;
          setCurrentUser(userToStore);
          // 2. Devolver el nuevo usuario al formulario de registro
          resolve(userToStore);
        })
        .catch(error => {
          // Si la API falló (ej: email duplicado)
          reject(error);
        });
    });
  };
  const logout = () => {
    setCurrentUser(null);
  };
  // Valores que proveerá el contexto
  const value = {
    currentUser,
    login,
    logout,
    register, // Añadimos la nueva función al contexto
    isAuthenticated: !!currentUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};