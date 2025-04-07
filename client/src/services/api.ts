import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiClient = {
  setAuthToken: (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  get: async <T>(url: string) => {
    const response = await api.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any) => {
    const response = await api.post<T>(url, data);
    return response.data;
  },

  postJSON: async <T>(url: string, data: any) => {
    const response = await api.post<T>(url, data);
    return response.data;
  },
};

export default apiClient;
