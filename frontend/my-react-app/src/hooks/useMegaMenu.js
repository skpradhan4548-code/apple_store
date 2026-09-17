import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:5000';

/**
 * useMegaMenu Hook
 * Manages dynamic menu data fetching from backend and hover interaction lifecycle
 */
export const useMegaMenu = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimerRef = useRef(null);

  // Fetch navigation data from backend
  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/megamenu`);
        const json = await res.json();
        if (json.success && isMounted) {
          setMenuData(json.data);
        }
      } catch (err) {
        console.warn('Backend megamenu fetch error:', err);
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
