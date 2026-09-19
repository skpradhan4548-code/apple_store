import { useState, useEffect, useRef, useCallback } from 'react';
import apiClient from '../services/apiClient';

/**
 * useMegaMenu Hook
 * Manages dynamic menu data fetching from backend and hover interaction lifecycle
 */
export const useMegaMenu = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimerRef = useRef(null);

  // Fetch navigation data from backend via apiClient
  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getMegaMenu();
        if (isMounted && data) {
          setMenuData(data);
        }
      } catch (err) {
        console.warn('Backend megamenu fetch error, falling back:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMenu();
    return () => {
      isMounted = false;
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMenu = useCallback((categoryId) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(categoryId);
  }, []);

  const closeMenuWithDelay = useCallback((delay = 200) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, delay);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const closeImmediately = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(null);
  }, []);

  return {
    menuData,
    loading,
    activeMenu,
    openMenu,
    closeMenuWithDelay,
    cancelClose,
    closeImmediately,
  };
};

export default useMegaMenu;
