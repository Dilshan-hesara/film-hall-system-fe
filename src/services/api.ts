// import axios from 'axios';

// const api = axios.create({

//   baseURL: 'http://localhost:5000/api/v1', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response, 
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken'); 

//         if (!refreshToken) {
          
//             throw new Error("No refresh token"); 
//         }

//         const res = await axios.post('http://localhost:5000/api/v1/auth/refresh', {
//           token: refreshToken,
//         });

//         if (res.status === 200) {
//           const { accessToken } = res.data;

//           localStorage.setItem('accessToken', accessToken);

//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'https://film-hall-system-be.vercel.app/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post('https://film-hall-system-be.vercel.app/api/v1/auth/refresh', {
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;