// Axios instances and interceptors configuration, configuring refresh token ability
import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { loadRefreshToken, saveRefreshToken, loadAccessToken, saveAccessToken } from "./LoginPage/utils"

const axiosBaseConfig = {
  baseURL: "http://localhost:5000"
};

// Base axios instance
const axiosInstance = axios.create(axiosBaseConfig);

// Base axios instance without interceptors
const axiosWithoutInterceptors = axios.create(axiosBaseConfig);

// Interceptors for base axios instance
// axiosInstance.interceptors.request.use(
//   async config => {
//     // Send auth token in all requests by default
//     const accessToken = await loadAccessToken();
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken["accessToken"]}`;
//     }
//     return Promise.resolve(config)
//   },
//   error => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    // Get original request config
    let originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await loadRefreshToken();
      const data = {};
      const conf = {
        headers: {
          "Authorization": `Bearer ${refreshToken["refreshToken"]}`
        }
      };
      return axiosInstance.post("/auth/refresh", data, conf)
        .then(async response => {
          await saveRefreshToken(response.data["refresh_token"]);
          await saveAccessToken(response.data["access_token"]);
          originalRequest.headers["Authorization"] = `Bearer ${response.data["access_token"]}`;
          return axiosInstance(originalRequest)
        })
        .catch(console.log)
    }
    return Promise.reject(error)
  }
);

export { axiosInstance, axiosWithoutInterceptors }
