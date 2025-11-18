import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un "hook" personalizado para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

// 3. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  // 4. Estado para los items del carrito (lee desde localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const itemsFromStorage = localStorage.getItem('cart');
      return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
    } catch (error) {
      console.error("Error al leer localStorage del carrito", error);
      return [];
    }
  });

  // 5. useEffect para guardar en localStorage CADA VEZ que el carrito cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage", error);
    }
  }, [cartItems]);

  // --- 6. Función para añadir al carrito (CON VALIDACIÓN DE STOCK) ---
  const addToCart = (product) => {
    // Asegurarse de que el producto tenga stock definido y sea un número
    const stockDisponible = Number(product.stock) || 0;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Si existe, verifica si se puede añadir uno más
        if (existingItem.quantity < stockDisponible) {
          // Si hay stock, incrementa la cantidad
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Si no hay más stock, no hagas nada y avisa
          alert(`No puedes añadir más unidades de ${product.name}. Stock máximo (${stockDisponible}) alcanzado en el carrito.`);
          return prevItems; // Devuelve los items sin cambios
        }
      } else {
        // Si no existe y hay stock, añádelo con cantidad 1
        if (stockDisponible > 0) {
          // Guardamos el stock junto con el item
          return [...prevItems, { ...product, quantity: 1, stock: stockDisponible }];
        } else {
          // Si no hay stock inicial, no se puede añadir
          alert(`El producto ${product.name} está agotado.`);
          return prevItems; // Devuelve los items sin cambios
        }
      }
    });
    // Solo mostrar alerta de éxito si se pudo añadir o incrementar
    // (Podríamos mejorar esto para no mostrarla si el stock ya estaba al máximo)
  };

  // --- 7. Funciones para actualizar (CON VALIDACIÓN DE STOCK), eliminar y vaciar ---
  const updateQuantity = (id, newQuantity) => {
    const qty = parseInt(newQuantity, 10) || 1; // Asegurar que sea número >= 1

    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const stockDisponible = Number(item.stock) || 0; // Obtener stock del item en carrito
          // Aplicar la nueva cantidad solo si es válida y menor o igual al stock
          if (qty >= 1 && qty <= stockDisponible) {
            return { ...item, quantity: qty };
          } else if (qty > stockDisponible) {
            // Si la cantidad excede el stock, ajustarla al máximo y avisar
            alert(`Solo quedan ${stockDisponible} unidades de ${item.name}.`);
            return { ...item, quantity: stockDisponible };
          }
          // Si qty < 1, no hacer nada
          return item; // Devolver item sin cambios si la cantidad no es válida
        }
        return item; // Devolver otros items sin cambios
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const clearCart = () => {
    setCartItems([]);
  };
  // 8. Valor derivado: contador total de ítems (sin cambios)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // 9. Valores que el proveedor ofrecerá (sin cambios)
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};