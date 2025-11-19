// src/data/productsAPI.js

// URL base del Backend (Controlador de Productos)
const API_URL = 'http://localhost:8080/api/productos';

// Helper para obtener las cabeceras con el Token (Necesario para Admin)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Adjuntamos el JWT aquí
  };
};

// --- 1. FUNCIONES PÚBLICAS (Cualquiera puede verlas) ---

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Error al cargar la lista de productos');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return []; // Devolvemos array vacío para no romper la UI
  }
};

// Obtener un producto por ID (Detalle)
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error en getProductById:", error);
    throw error;
  }
};

// --- 2. FUNCIONES DE ADMINISTRADOR (Requieren Token) ---

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(), // Enviamos el Token
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear el producto');
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createProduct:", error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(), // Enviamos el Token
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateProduct:", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders() // Enviamos el Token
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    return { message: 'Producto eliminado correctamente' };
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    throw error;
  }
};