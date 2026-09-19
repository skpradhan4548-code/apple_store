/**
 * Centralized API Client Service
 * Single source of truth for all network requests to the backend API.
 * Adheres to the Three-Layer Rule: UI -> Feature Logic -> API Service.
 */

const API_ROOT = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

/**
 * Internal generic request handler with unified error parsing
 */
async function request(endpoint, options = {}) {
  const url = `${API_ROOT}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status) {
      err.isNetworkError = true;
    }
    throw err;
  }
}

export const apiClient = {
  // ── Products ──
  async getProducts(category) {
    const query = category ? `?category=${encodeURIComponent(category.trim().toLowerCase())}` : '';
    const res = await request(`/products${query}`);
    return res.products || [];
  },

  async getProductById(id) {
    const res = await request(`/products/${encodeURIComponent(id)}`);
    return res.product;
  },

  async getRelatedProducts(category, excludeId = null) {
    try {
      const res = await request(`/products/category/${encodeURIComponent(category.trim().toLowerCase())}`);
      const list = res.products || [];
      return excludeId ? list.filter(p => p.id !== excludeId) : list;
    } catch {
      return [];
    }
  },

  async searchProducts(query, limit = 8) {
    if (!query || !query.trim()) return [];
    try {
      const res = await request(`/products?search=${encodeURIComponent(query.trim())}&limit=${limit}`);
      return res.products || [];
    } catch {
      return [];
    }
  },

  // ── Categories ──
  async getCategories() {
    const res = await request('/categories');
    return res.categories || [];
  },

  async getCategoryBySlug(slug) {
    const res = await request(`/categories/${encodeURIComponent(slug)}`);
    return res.category;
  },

  // ── MegaMenu ──
  async getMegaMenu() {
    const res = await request('/megamenu');
    return res.data;
  },

  // ── Auth ──
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name, email, password) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async getMe(token) {
    return request('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ── Orders ──
  async createOrder(orderData, token = null) {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return request('/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });
  },

  async getMyOrders(token) {
    return request('/orders/my-orders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getOrderById(orderRef, token = null) {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return request(`/orders/${encodeURIComponent(orderRef)}`, {
      method: 'GET',
      headers,
    });
  },
};

export default apiClient;
