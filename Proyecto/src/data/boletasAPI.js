// src/data/boletasAPI.js

const API_URL = 'http://localhost:8080/api/ordenes';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// --- FUNCIÓN ADAPTADORA (MAGIA AQUÍ) ---
// Transforma los datos de JAVA (usuario, detalles) a REACT (cliente, items)
const adaptarOrdenParaFrontend = (ordenBackend) => {
  if (!ordenBackend) return null;

  return {
    // Backend manda 'id', Frontend usaba 'numero'
    numero: ordenBackend.id, 
    fecha: ordenBackend.fecha,
    
    // Backend manda 'total', Frontend usaba 'resumen.total'
    resumen: {
      subtotal: ordenBackend.total,
      envio: 0, // Asumimos envio incluido o 0 por simplicidad en la vista admin
      total: ordenBackend.total
    },

    // AQUÍ ESTABA EL ERROR: Backend manda 'usuario', Frontend espera 'cliente'
    cliente: ordenBackend.usuario || { 
      nombre: 'Usuario', 
      apellidos: 'Eliminado', 
      correo: 'No disponible' 
    },

    // Backend manda 'detalles' (con 'producto'), Frontend espera 'items'
    items: (ordenBackend.detalles || []).map(detalle => ({
      id: detalle.producto.id,
      name: detalle.producto.name,
      price: detalle.precioUnitario,
      quantity: detalle.cantidad
    }))
  };
};


// Obtener todas las boletas (ADMIN)
export const getAllBoletas = async () => {
  try {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Error al obtener historial de órdenes');
    
    const dataBackend = await response.json();

    // Pasamos cada orden recibida por el adaptador antes de entregarla a los componentes
    // ordenamos por id descendente (las nuevas primero)
    return dataBackend
      .map(adaptarOrdenParaFrontend)
      .sort((a, b) => b.numero - a.numero); 

  } catch (error) {
    console.error(error);
    return [];
  }
};

// Crear Boleta (CHECKOUT)
export const createBoleta = async (boletaData) => {
  // Preparamos payload para Java (solo items)
  const payload = {
      items: boletaData.items.map(item => ({
          productoId: item.id,
          cantidad: item.quantity
      }))
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    const ordenCreadaBackend = await response.json();
    
    // Devolvemos la orden adaptada para que PagoCorrecto.js la pueda mostrar bien
    return adaptarOrdenParaFrontend(ordenCreadaBackend);

  } catch (error) {
    console.error("Error en createBoleta:", error);
    throw error;
  }
};