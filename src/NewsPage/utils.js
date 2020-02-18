import { axiosInstance as axios } from "../axiosInstance";

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
    .catch(error => {
      console.log(error);
    });
};

const deleteNewsPost = (event, setNeedFetchNews) => {
  axios.delete('/news/' + event.target.id)
    .then(() => {
      setNeedFetchNews(true);
    })
    .catch(error => console.log(error))
};


export { fetchNews, deleteNewsPost }
