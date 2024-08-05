import axiosLib from 'axios'
import Cookies from 'js-cookie'
import router from '../../router';

const axios = axiosLib.create({
  //baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://fidelityapi.brain-booster.net/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  credentials: 'include',
  withXSRFToken: true,
})

axios.defaults.withCredentials  = true // allow sending cookies

axios.interceptors.request.use(async (config) => {
  console.log('===================================')
  console.log(config.method)
  const request_method = config.method
  if (request_method.toLowerCase() !== 'get') {
    await axios.get('/csrf-cookie').then(() => {
      config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    })
  }
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer '+token;
  }

  return config
}, error => {
  // return error
  return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
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

export default axios