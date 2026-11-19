import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:5000/api'
});




// Prodotti
export const getProducts = (params) => API.get('/products', { params });
export const getLowStockProducts = () => API.get('/products/low-stock');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Movimenti (Carichi / Scarichi)
export const getMovements = () => API.get('/movements');
export const createMovement = (movementData) => API.post('/movements', movementData);

export default API;
