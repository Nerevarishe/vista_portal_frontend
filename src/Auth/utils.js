import { axiosInstance as axios } from "../config/axiosInstance";
import { db, REFRESH_TOKEN, ACCESS_TOKEN } from "../config/dexieConfig";

const saveRefreshToken = async (refreshToken) => {
  await db.tokensTable.put({ id: 1, refreshToken: refreshToken });
};

const loadRefreshToken = async () => {
  return await db.tokensTable.where("id").equals(1).first();
};

const userIdentityFromAccessToken = async (accessToken) => {
  const base64Url = accessToken.split(".")[1];
  const decodedValue = JSON.parse(window.atob(base64Url));
  console.log(decodedValue);
  return {
    username: decodedValue["identity"],
    role: decodedValue["user_claims"]["role"],
  };
};

const saveAccessToken = async (accessToken) => {
  await db.tokensTable.put({ id: 2, accessToken: accessToken });
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
  return await userIdentityFromAccessToken(accessToken);
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
    return Promise.resolve(
      await userIdentityFromAccessToken(response.data["access_token"])
    );
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
