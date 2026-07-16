import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://e-commerce-api-3wara.vercel.app",

  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {

  // const token = localStorage.getItem("dashboard-token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDEyNjk3NSwiZXhwIjoxNzg0NTU4OTc1fQ._XsSsCKnrKggD_7Y71EdHk84zfmBGwvxJknVm0ClFdk";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.log("Unauthorized request:", error.config.url);

      // لا تعمل redirect هنا
      // نخلي الصفحة نفسها تتعامل مع الخطأ

    }

    return Promise.reject(error);

  }

);