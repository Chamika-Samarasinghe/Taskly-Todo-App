import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor - normalize errors
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const todoService = {
  getAll: () => api.get('/todos').then((r) => r.data),
  create: (data) => api.post('/todos', data).then((r) => r.data),
  update: (id, data) => api.put(`/todos/${id}`, data).then((r) => r.data),
  toggleDone: (id) => api.patch(`/todos/${id}/done`).then((r) => r.data),
  remove: (id) => api.delete(`/todos/${id}`).then((r) => r.data),
};
