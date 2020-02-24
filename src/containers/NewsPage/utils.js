import { axiosInstance as axios } from "../../configs/axiosInstance";
import { loadAccessToken } from "../../Auth/utils";

const fetchNews = async (page, perPage, setNewsPostsState, setNeedFetchNews) => {
  await axios.get("/news/?page=" + page + "&per_page=" + perPage)
    .then(response => {
      setNewsPostsState({
          news: response.data["posts"],
          postsPageHasNext: response.data["postsPageHasNext"],
          postsPageHasPrev: response.data["postsPageHasPrev"]
        }
      );
      setNeedFetchNews(false);
    })
    .catch();
};

const deleteNewsPost = async (event, setNeedFetchNews) => {
  const accessToken = await loadAccessToken();
  const conf = {
    headers: {
      "Authorization": `Bearer ${accessToken["accessToken"]}`
    }
  };
  axios.delete(`/news/${event.target["id"]}`, conf)
    .then(() => {
      setNeedFetchNews(true);
    })
    .catch()
};

export { fetchNews, deleteNewsPost }
