import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'apple_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  /* Persist to localStorage whenever items change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, variant = null, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${variant?.label || 'default'}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        key,
        id:       product.id,
        name:     product.name,
        price:    variant?.price || product.basePrice,
        image:    product.image,
        variant:  variant?.label || null,
        qty,
      }];
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
