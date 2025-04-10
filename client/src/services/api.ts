import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request configuration
api.defaults.timeout = 10000; // 10 seconds
api.defaults.timeoutErrorMessage = "Request timed out";
api.defaults.maxRedirects = 5;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

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

  put: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, data?: any) => {
    const response = await api.delete<T>(url, { data });
    return response.data;
  },

  // Add method for handling FormData
  postFormData: async <T>(url: string, formData: FormData) => {
    const response = await api.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  putFormData: async <T>(url: string, formData: FormData) => {
    const response = await api.put<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// Add custom error handling
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.status || 500,
      error.response?.data?.message || "An error occurred",
      error.response?.data
    );
  }
  throw error;
};

export default apiClient;
