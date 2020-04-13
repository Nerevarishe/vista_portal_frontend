import {
  axiosInstance as axios,
  axiosWithoutInterceptors,
} from "../configs/axiosInstance";
import { db, REFRESH_TOKEN, ACCESS_TOKEN } from "../configs/dexieConfig";
import { history } from "../App";

const saveRefreshToken = async (refreshToken) => {
  await db.tokensTable.put({ id: 1, refreshToken: refreshToken });
};

const loadRefreshToken = async () => {
  return await db.tokensTable.where("id").equals(1).first();
};

const saveAccessToken = async (AccessToken) => {
  await db.tokensTable.put({ id: 2, accessToken: AccessToken });
};

const loadAccessToken = async () => {
  return await db.tokensTable.where("id").equals(2).first();
};

const deleteToken = async (id) => {
  await db.tokensTable.where("id").equals(id).delete();
};

const loginUser = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  const response = await axios.post("/auth/login", data);
  // TODO: Implement checkin response from server for errors 400 401 404
  const accessToken = response.data["access_token"];
  const refreshToken = response.data["refresh_token"];
  await saveAccessToken(accessToken);
  await saveRefreshToken(refreshToken);
};

const autoLoginUser = async () => {
  const refreshToken = await loadRefreshToken();
  if (!refreshToken) {
    return Promise.reject();
  }
  const data = {};
  const conf = {
    headers: {
      Authorization: `Bearer ${refreshToken["refreshToken"]}`,
    },
  };
  const response = await axios.post("/auth/refresh", data, conf);
  if (response.status === 200) {
    await saveAccessToken(response.data["access_token"]);
    await saveRefreshToken(response.data["refresh_token"]);
    const base64Url = response.data["access_token"].split(".")[1];
    const decodedValue = JSON.parse(window.atob(base64Url));
    return Promise.resolve(decodedValue["identity"]);
  }
  return Promise.reject();
};

const logoutUser = async () => {
  await deleteToken(REFRESH_TOKEN);
  await deleteToken(ACCESS_TOKEN);
};

export {
  saveRefreshToken,
  loadRefreshToken,
  saveAccessToken,
  loadAccessToken,
  loginUser,
  autoLoginUser,
  logoutUser,
};
