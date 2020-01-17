import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let authToken, refreshToken = '';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axiosInstance.post('/auth/refresh',
  { headers: {
    Authorization: "Bearer " + refreshToken
  }}).then(tokenRefreshResponse => {
    // localStorage.setItem('token', tokenRefreshResponse.data.token);
    authToken = tokenRefreshResponse.data["authToken"];
    refreshToken = tokenRefreshResponse.data["refreshToken"];
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data["authToken"];
    return Promise.resolve();
});

// Login function
const userLogin = (username, password) => {
  axiosInstance.post('/auth/login', {'username': username, password: password})
    .then(response => {
      authToken = response.data["authToken"];
      refreshToken = response.data["refreshToken"];
    })
    .catch(error => console.log(error))
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export { axiosInstance, authToken, refreshToken, userLogin};
