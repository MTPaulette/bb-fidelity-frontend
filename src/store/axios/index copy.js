import axios from 'axios';
import router from '../../router';

const instance = axios.create({
  //baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://fidelityapi.brain-booster.net/api',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-origin": "*",
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': true,

  },
  withCredentials: true,
  credentials: 'include',
  withXSRFToken: true,
  // timeout: 30000,
});

// Ajoute un interceptor de requête pour ajouter le token à chaque requête
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // config.headers.Authorization = 'Bearer 54|d6DgHQcvVlvxf5pcubE6eCHLQuUOLx9YSxc5uqWkd0e472fc';
    config.headers.Authorization = 'Bearer '+token;
  }
  return config;
}, error => {
  // return error
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