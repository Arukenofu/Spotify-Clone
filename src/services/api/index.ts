import { ofetch } from 'ofetch/node';

const api = ofetch.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  credentials: 'include'
});

export default api;