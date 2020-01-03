import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://5e0f4ab89576aa0014666553.mockapi.io"
});

export { axiosInstance };
