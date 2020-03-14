import { axiosInstance as axios } from "../../configs/axiosInstance";
import { loadAccessToken } from "../../Auth/utils";

const fetchNews = async (page, perPage) => {
  return await axios.get(`/news/?page=${page}&per_page=${perPage}`)
};

const deleteNewsPost = async (event) => {
  const accessToken = await loadAccessToken();
  const conf = {
    headers: {
      "Authorization": `Bearer ${accessToken["accessToken"]}`
    }
  };
  return await axios.delete(`/news/${event.target["id"]}`, conf)
};

export { fetchNews, deleteNewsPost }
