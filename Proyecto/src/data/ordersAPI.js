// --- 1. CLAVE DE LOCALSTORAGE ---
const ORDERS_STORAGE_KEY = 'orders_db';

// --- 2. DATOS INICIALES (SI LOCALSTORAGE ESTÁ VACÍO) ---
// Estos son los pedidos originales.
const initialOrders = [
  {
    id: 1001,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-24T14:30:00Z',
    total: 115000,
    estado: 'Completado',
    items: [{ id: 2, quantity: 1 }] 
  },
  {
    id: 1002,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-23T10:15:00Z',
    total: 161000, 
    estado: 'Completado',
    items: [{ id: 7, quantity: 1 }, { id: 3, quantity: 1 }] 
  },
  {
    id: 1003,
    clienteId: 1,
    clienteNombre: 'Admin Principal',
    fecha: '2025-10-22T09:05:00Z',
    total: 89000,
    estado: 'Pendiente',
    items: [{ id: 1, quantity: 1 }]
  },
  {
    id: 1004,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-21T18:45:00Z',
    total: 180000, 
    estado: 'Completado',
    items: [{ id: 6, quantity: 1 }]
  },
  {
    id: 1005,
    clienteId: 2,
    clienteNombre: 'Cliente Prueba',
    fecha: '2025-10-20T11:20:00Z',
    total: 88000, 
    estado: 'Cancelado',
    items: [{ id: 9, quantity: 1 }]
  }
];

// --- 3. FUNCIONES CRUD USANDO LOCALSTORAGE ---

export const getAllOrders = () => {
  return new Promise((resolve) => {
    // Simulamos un pequeño retraso
    setTimeout(() => {
      const ordersJSON = localStorage.getItem(ORDERS_STORAGE_KEY);
      let orders = [];
      if (ordersJSON) {
        try {
          orders = JSON.parse(ordersJSON);
        } catch (error) {
          console.error("Error al parsear pedidos de localStorage:", error);
          orders = [...initialOrders]; // Usar iniciales si hay error
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        }
      } else {
        orders = [...initialOrders]; // Usar y guardar iniciales si no existen
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      }
      // Devolvemos ordenados por fecha, del más nuevo al más viejo
      const sortedOrders = [...orders].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      resolve(sortedOrders);
    }, 800);
  });
};


export const createOrder = (orderData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await getAllOrders(); // Lee los pedidos actuales

      // Calcular nuevo ID (simple, basado en el máximo actual o un valor inicial)
      const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001; // Empezar desde 1001 si está vacío
      
      // Asignar estado por defecto si no viene
      const newOrder = {
        ...orderData,
        id: newId,
        estado: orderData.estado || 'Pendiente', // Por defecto 'Pendiente'
        fecha: orderData.fecha || new Date().toISOString() // Fecha actual si no viene
      };

      orders.push(newOrder); // Añadir a la lista
      // Guardar la lista COMPLETA actualizada
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

      resolve(newOrder);
    } catch (error) {
       console.error("Error en createOrder:", error);
       reject(error);
    }
  });
};


export const updateOrderStatus = (id, newStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await getAllOrders(); // Lee actuales
            const orderId = parseInt(id);
            const index = orders.findIndex(o => o.id === orderId);

            if (index !== -1) {
                // Actualizar solo el estado
                orders[index].estado = newStatus;

                // Guardar la lista COMPLETA actualizada
                localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
                resolve({ ...orders[index] }); // Devolver copia actualizada
            } else {
                reject(new Error('No se pudo actualizar: Pedido no encontrado'));
            }
        } catch (error) {
            console.error("Error en updateOrderStatus:", error);
            reject(error);
        }
    });
};


export const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await getAllOrders(); // Lee actuales
            const orderId = parseInt(id);
            const initialLength = orders.length;

            // Crear NUEVA lista filtrada
            orders = orders.filter(o => o.id !== orderId);

            if (orders.length < initialLength) { // Si se eliminó algo
                // Guardar la lista COMPLETA filtrada
                localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
                resolve({ message: 'Pedido eliminado con éxito.' }); // Éxito
            } else {
                reject(new Error('No se pudo eliminar: Pedido no encontrado'));
            }
        } catch (error) {
            console.error("Error en deleteOrder:", error);
            reject(error);
        }
    });
};


export const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
        const orders = await getAllOrders();
        const orderId = parseInt(id);
        const order = orders.find(o => o.id === orderId);
        if (order) {
            resolve(order);
        } else {
            reject(new Error('Pedido no encontrado.'));
        }
    } catch (error) {
        console.error("Error en getOrderById:", error);
        reject(error);
    }
  });
};