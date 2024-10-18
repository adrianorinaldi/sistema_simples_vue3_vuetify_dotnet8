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

api.interceptors.response.use(response => {
  return response;
}, error => {
  console.log("rror.response", error.response)
  if (error.response) {
    const status = error.response.status;
    if (status >= 500) {
      // Erros do servidor
      alert('Ocorreu um erro no servidor. Tente novamente mais tarde.');
    } else if (status == 401) {
      alert('Sessão expirada. Faça login novamente...');
      localStorage.removeItem('auth_token');
      window.location = "/login";
    }
  } else if (error.request) {
    // Quando a requisição foi feita mas não houve resposta
    alert('Sem resposta do servidor. Verifique sua conexão com a internet.');
  }

  return Promise.reject(error);
});

export default api;
