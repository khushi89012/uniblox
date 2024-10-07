import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Add item to cart
export const addToCart = (data) => {
  return axios.post(`${API_BASE_URL}/cart/add`, data);
};

// Checkout
export const checkout = (data) => {
  return axios.post(`${API_BASE_URL}/checkout`, data);
};

// Generate discount code (admin)
export const generateDiscount = () => {
  return axios.post(`${API_BASE_URL}/admin/generate-discount`);
};

// Get admin report
export const getReport = () => {
  return axios.get(`${API_BASE_URL}/admin/report`);
};
