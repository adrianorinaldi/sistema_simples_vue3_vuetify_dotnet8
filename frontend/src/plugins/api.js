// src/services/axios.js
import axios from "axios";

// Cria a instância do Axios com a URL base e outras configurações
const api = axios.create({
  baseURL: 'https://localhost:5000/api/',  // Substitua pela URL base da sua API
  headers: {
    'Content-Type': 'application/json', // Cabeçalhos comuns para todas as requisições
  },
  timeout: 10000,  // Opcional: define o tempo limite para as requisições (em milissegundos)
});

// Você pode interceptar e modificar as requisições antes de elas serem enviadas
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');  // Recupera o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Define o cabeçalho Authorization para todas as requisições
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Também é possível interceptar as respostas
api.interceptors.response.use(response => {
  return response;
}, error => {
  // Gerenciamento de erros globais, como redirecionamento ao login se o token estiver expirado
  if (error.response && error.response.status === 401) {
    // Exemplo: redirecionar para o login
    //window.location = '/login';
  }
  return Promise.reject(error);
});

export default api;
