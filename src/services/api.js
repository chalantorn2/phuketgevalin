/**
 * API Service - Phuket Gevalin
 * เชื่อมต่อ React กับ Backend PHP
 */

// API Base URL - ใช้ production URL สำหรับ development เพื่อหลีกเลี่ยงปัญหา proxy
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'https://www.phuketgevalin.com/api'
  : '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}/${endpoint}`;

  const defaultOptions = {
    credentials: 'include', // ส่ง cookies ไปกับทุก request เพื่อรักษา session
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============================================
// Package Tours API
// ============================================
export const packageToursAPI = {
  getAll: (showAll = false, category = null) => {
    let query = showAll ? '?all=true' : '';
    if (category && category !== 'all') {
      query += (query ? '&' : '?') + `category=${category}`;
    }
    return fetchAPI(`package_tours${query}`);
  },
  getById: (id) => fetchAPI(`package_tours?id=${id}`),
  create: (data) => fetchAPI('package_tours', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`package_tours?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`package_tours?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// Hotels API
// ============================================
export const hotelsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`hotels${query ? `?${query}` : ''}`);
  },
  getById: (id) => fetchAPI(`hotels?id=${id}`),
  create: (data) => fetchAPI('hotels', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`hotels?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`hotels?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// Transfers API
// ============================================
export const transfersAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`transfers${query ? `?${query}` : ''}`);
  },
  getById: (id) => fetchAPI(`transfers?id=${id}`),
  create: (data) => fetchAPI('transfers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`transfers?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`transfers?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// Bookings API
// ============================================
export const bookingsAPI = {
  getByRef: (ref) => fetchAPI(`bookings?ref=${ref}`),
  getById: (id) => fetchAPI(`bookings?id=${id}`),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`bookings${query ? `?${query}` : ''}`);
  },
  create: (data) => fetchAPI('bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: (id, status) => fetchAPI(`bookings?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  cancel: (id) => fetchAPI(`bookings?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// Contact API
// ============================================
export const contactAPI = {
  send: (data) => fetchAPI('contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`contact${query ? `?${query}` : ''}`);
  },
  markAsRead: (id) => fetchAPI(`contact?id=${id}`, {
    method: 'PUT',
  }),
};

// ============================================
// Promotions API
// ============================================
export const promotionsAPI = {
  getAll: (showAll = false) => fetchAPI(`promotions${showAll ? '?all=true' : ''}`),
  getById: (id) => fetchAPI(`promotions?id=${id}`),
  create: (data) => fetchAPI('promotions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`promotions?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`promotions?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// One Day Trips API
// ============================================
export const onedayTripsAPI = {
  getAll: (showAll = false, province = null) => {
    let query = showAll ? '?all=true' : '';
    if (province && province !== 'all') {
      query += (query ? '&' : '?') + `province=${province}`;
    }
    return fetchAPI(`oneday_trips${query}`);
  },
  getById: (id) => fetchAPI(`oneday_trips?id=${id}`),
  create: (data) => fetchAPI('oneday_trips', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`oneday_trips?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`oneday_trips?id=${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// Auth API
// ============================================
export const authAPI = {
  login: (username, password) => fetchAPI('auth', {
    method: 'POST',
    body: JSON.stringify({ action: 'login', username, password }),
  }),
  logout: () => fetchAPI('auth', {
    method: 'POST',
    body: JSON.stringify({ action: 'logout' }),
  }),
  checkSession: () => fetchAPI('auth?action=check'),
};

// ============================================
// Admin API
// ============================================
export const adminAPI = {
  getDashboard: () => fetchAPI('admin?action=dashboard'),
  getBookings: (status = '') => fetchAPI(`admin?action=bookings${status && status !== 'all' ? `&status=${status}` : ''}`),
  getPackageTours: () => fetchAPI('admin?action=package_tours'),
  getHotels: () => fetchAPI('admin?action=hotels'),
  getTransfers: () => fetchAPI('admin?action=transfers'),
  getContacts: () => fetchAPI('admin?action=contacts'),
};

// ============================================
// Test API Connection
// ============================================
export const testConnection = () => fetchAPI('');

export default {
  packageTours: packageToursAPI,
  hotels: hotelsAPI,
  transfers: transfersAPI,
  bookings: bookingsAPI,
  contact: contactAPI,
  promotions: promotionsAPI,
  onedayTrips: onedayTripsAPI,
  auth: authAPI,
  admin: adminAPI,
  testConnection,
};
