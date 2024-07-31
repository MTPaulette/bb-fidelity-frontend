import axios from 'axios';
import router from '../../router';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  //baseURL: 'https://fidelityapi.brain-booster.net/api',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-origin": "*",
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true, // inclure les cookies si nécessaire
  withXSRFToken: true,
  timeout: 10000,
});

// Ajoute un interceptor de requête pour ajouter le token à chaque requête
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer 83|8mScWmyeTeHBAJ8cLtLnrjcFRiZftjrdIZjMzTUt01802e24';
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const status = error.response.staus
  if(status == 401) {
    router.push({ name: 'login' })
  }
  if(status == 403) {
    router.push({ name: 'forbidden' })
  }
  if(status == 404) {
    router.push({ name: 'notFound' })
  }
  console.log("==============================================================: "+error.response.status)
  // switch(error.response.status) {
  //   case 403: router.push({ name: 'forbidden' });
  //   case 401: router.push({ name: 'login' });
  //   case 404: router.push({ name: 'notFound' });
  // }
  return Promise.reject(error);
});

export default instance;