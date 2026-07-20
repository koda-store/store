import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://e-commerce-api-3wara.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dashboard-token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTc5Zjg1YmFmOTJiNzU2ZDBiZmFmZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDIxMjU3MywiZXhwIjoxNzg0NjQ0NTczfQ.6BukOZHxtSuRxbCubJwkVayLEvesQSgQjRmKOKJKh_s";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTc5Zjg1YmFmOTJiNzU2ZDBiZmFmZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDE5ODk4NSwiZXhwIjoxNzg0NjMwOTg1fQ.HraUis0K9FZA5z6PWHifJ8jtvzkrvlIBY5IkH6YBI5Q";
  }

  return config;

});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(localStorage.getItem("dashboard-token"));
    if (error.response?.status === 401) {    
      localStorage.removeItem("dashboard-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
