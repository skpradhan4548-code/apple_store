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

  const addToCart = useCallback((product, selectedOptions = null, qty = 1) => {
    setItems(prev => {
      const colorLabel = selectedOptions?.color || (typeof selectedOptions?.label === 'string' && !selectedOptions.storage ? selectedOptions.label : null);
      const storageLabel = selectedOptions?.storage || null;
      const variantLabel = [colorLabel, storageLabel].filter(Boolean).join(', ') || selectedOptions?.label || null;
      const price = Number(selectedOptions?.price ?? product.basePrice);
      const image = selectedOptions?.image || product.image;

      const key = `${product.id}-${colorLabel || 'any'}-${storageLabel || 'any'}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        key,
        id:       product.id,
        name:     product.name,
        price,
        image,
        variant:  variantLabel,
        color:    colorLabel,
        storage:  storageLabel,
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
