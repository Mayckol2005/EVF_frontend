import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const itemsFromStorage = localStorage.getItem('cart');
      return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
    } catch (error) {
      console.error("Error al leer localStorage del carrito", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const stockDisponible = Number(product.stock) || 0;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < stockDisponible) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          alert(`No puedes añadir más unidades de ${product.name}. Stock máximo (${stockDisponible}) alcanzado en el carrito.`);
          return prevItems; 
        }
      } else {
        if (stockDisponible > 0) {
          return [...prevItems, { ...product, quantity: 1, stock: stockDisponible }];
        } else {
          alert(`El producto ${product.name} está agotado.`);
          return prevItems; 
        }
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    const qty = parseInt(newQuantity, 10) || 1; 

    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const stockDisponible = Number(item.stock) || 0;
          if (qty >= 1 && qty <= stockDisponible) {
            return { ...item, quantity: qty };
          } else if (qty > stockDisponible) {
            alert(`Solo quedan ${stockDisponible} unidades de ${item.name}.`);
            return { ...item, quantity: stockDisponible };
          }
          return item; 
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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