import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Adjust this as per your backend URL
});

export default API;
