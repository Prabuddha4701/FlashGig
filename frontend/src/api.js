import axios from "axios";

// Default API URL (FastAPI default port is 8000)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
