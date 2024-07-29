import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://fidelityapi.brain-booster.net/api',
  baseURL: 'http://127.0.0.1:8000/api', // Votre URL de base pour les requêtes API
  withCredentials: true, // inclure les cookies si nécessaire
});

// Ajoute un interceptor de requête pour ajouter le token à chaque requête
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer '+token;
  }
  return config;
}, error => {
  // return error
  return Promise.reject(error);
});

export default instance;