import { axiosInstance as axios } from "../../configs/axiosInstance";
import { loadAccessToken } from "../../Auth/utils";

const fetchNews = async (page, perPage) => {
  return await axios.get(`/news/?page=${page}&per_page=${perPage}`);
};

const deleteNewsPost = async (id) => {
  const accessToken = await loadAccessToken();
  const conf = {
    headers: {
      Authorization: `Bearer ${accessToken["accessToken"]}`,
    },
  };
  return await axios.delete(`/news/${id}`, conf);
};

export { fetchNews, deleteNewsPost };
