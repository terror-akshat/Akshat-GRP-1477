import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL: `${backendUrl}/api/`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});
export default instance;
