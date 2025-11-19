// src/data/usersAPI.js

const API_URL = 'http://localhost:8080/api';

// Helper para obtener el token (lo usaremos en todas las peticiones privadas)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Importante para Spring Security
  };
};

// --- LOGIN Y REGISTRO (Públicos) ---

export const loginUser = async (correo, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password }),
  });
  if (!response.ok) throw new Error(await response.text());
  const userData = await response.json();
  localStorage.setItem('token', userData.token);
  return userData;
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// --- GESTIÓN DE USUARIOS (Privados - Requieren Token) ---

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/usuarios`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Usuario no encontrado');
  return await response.json();
};

// Esta es la función que te estaba dando error
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Error al actualizar usuario');
  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Error al eliminar usuario');
  return { message: 'Usuario eliminado' };
};