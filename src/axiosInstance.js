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
axiosInstance.interceptors.request.use(
  async config => {
    // Send auth token in all requests by default
    const accessToken = await loadAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken["accessToken"]}`;
    }
    return config
  },
  error => Promise.reject(error)
);

let attempt = 0;

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    // Get original request config
    const originalRequest = error.config;
    // TODO: Comment this part of code
    if (error.response.status === 401 && attempt === 1) {
      // router.push('/auth/login');
      attempt = 0;
      console.log("Try redirect");
      return <Redirect to={'/login'} />
      // return Promise.reject(error)
    }

    // If server response with 401 error code and originalRequest._retry is false:
    if (error.response.status === 401 && !originalRequest._retry) {
      attempt++;
      originalRequest._retry = true;
      const refreshToken = await loadRefreshToken();
      const conf = {
        headers: {
          "Authorization": `Bearer ${refreshToken["refreshToken"]}`
        }
      };
      return axiosWithoutInterceptors.post('/auth/refresh', {}, conf)
        .then(async response => {
          if (response.status === 200) {
            await saveAccessToken(response.data["access_token"]);
            await saveRefreshToken(response.data["refresh_token"]);
            const accessToken = response.data["access_token"];
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken["accessToken"]}`;
            return axiosInstance(originalRequest)
          }
        })
        .catch(error => Promise.reject(error));
    }
  }
);

export { axiosInstance, axiosWithoutInterceptors }
