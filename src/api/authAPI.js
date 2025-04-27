import axios from "axios";

const api = axios.create({
    baseURL: 'https://leobook-backend-production.up.railway.app/api',
    withCredentials: true,
});


export default api;