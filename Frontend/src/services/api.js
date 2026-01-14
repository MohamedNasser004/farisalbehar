import axios from 'axios';
import axiosInstance from '../services/axiosInstance';

const API_BASE_URL = 'http://localhost:7000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add retry logic
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
      originalRequest._retry = true;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getBlogs = async () => {
  try {
     const headers = {
      'x-api-key': 'farisalbeharSecretKeyFARISALBEHAR' // ← نفس القيمة اللي في .env على السيرفر
    };
    const response = await api.get('/article/all', {headers});
    return { data: response.data };
  } catch (error) {
    return { data: [] };
  }
};

// services/api.js
export const getBlogBySlug = async (slug) => {
  try {
    const headers = {
      'x-api-key': 'farisalbeharSecretKeyFARISALBEHAR' // ← نفس القيمة اللي في .env على السيرفر
    };

    // First try with the slug as-is
    let response = await api.get(`/article/${slug}`, { headers });

    // If 404, try with encoded slug
    if (response.status === 404) {
      const encodedSlug = encodeURIComponent(slug);
      response = await api.get(`/article/${encodedSlug}`, { headers });
    }

    return { data: response.data };
  } catch (error) {
    return { data: null };
  }
};


export const createBlog = async (data) => {
  try {
    const response = await api.post('/article', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (slug, data) => {
  try {
    const response = await api.put(`/article/update/${slug}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (slug) => {
  try {
    const response = await axiosInstance.delete(`/article/delete/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (slug) => {
  try {
    const response = await api.get(`/comment/${slug}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const handleDelete = async (slug) => {
  const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا المقال؟");
  
  if (confirmDelete) {
    try {
      await deleteBlog(slug);
      alert("تم الحذف بنجاح!");
      return true;
    } catch (error) {
      alert("حدث خطأ أثناء عملية الحذف، حاول مرة أخرى.");
      return false;
    }
  }
  return false;
};