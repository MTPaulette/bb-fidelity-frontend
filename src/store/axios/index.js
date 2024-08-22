import axios from 'axios';
import router from '../../router';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  //baseURL: 'https://fidelity.bbdesign.dev/backend/api',
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
  //timeout: 1000,
});

// Ajoute un interceptor de requête pour ajouter le token à chaque requête
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer '+token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  switch(error.response.status) {
    case 403: return router.push({ name: 'forbidden' });
    case 401: 
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return router.push({ name: 'login' });
    case 404: return router.push({ name: 'notFound' });
    default: return Promise.reject(error);
   }
  
});

export default instance;