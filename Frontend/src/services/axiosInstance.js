import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.farisalbehar.com/api", // العنوان الرئيسي للـ API
});

// Interceptor لإضافة الـ Token إلى كل الطلبات
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
