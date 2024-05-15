import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:5080"
});



export default api;
