import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let accessToken, refreshToken = '';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axiosInstance.post('/auth/refresh',
  {},{ headers: {
    Authorization: "Bearer " + refreshToken
  }}).then(tokenRefreshResponse => {
    // localStorage.setItem('token', tokenRefreshResponse.data.token);
    accessToken = tokenRefreshResponse.data["access_token"];
    refreshToken = tokenRefreshResponse.data["refresh_token"];
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data["access_token"];
    return Promise.resolve();
});

// Login function
const userLogin = (username, password) => {
  axiosInstance.post('/auth/login', {'username': username, password: password})
    .then(response => {
      console.log(response.data);
      accessToken = response.data["access_token"];
      refreshToken = response.data["refresh_token"];
    })
    .catch(error => console.log(error))
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export { axiosInstance, accessToken, refreshToken, userLogin};
