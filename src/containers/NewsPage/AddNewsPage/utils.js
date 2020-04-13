import { axiosInstance as axios } from "../../../configs/axiosInstance";
import { loadAccessToken } from "../../../Auth/utils";

const savePost = async (state, newsPost) => {
  const accessToken = await loadAccessToken();
  const data = {
    postBody: newsPost,
  };
  const conf = {
    headers: {
      Authorization: `Bearer ${accessToken["accessToken"]}`,
    },
  };
  if (state.newsPosts["editorMode"] === "create") {
    return await axios.post("/news/", data, conf);
  } else if (state.newsPosts["editorMode"] === "edit") {
    return await axios.put(
      `/news/${state.newsPosts["editPostId"]}`,
      data,
      conf
    );
  }
};

const fetchNewsPost = async (state) => {
  if (state.newsPosts["editorMode"] === "edit") {
    return await axios.get(`/news/${state.newsPosts["editPostId"]}`);
  }
};

export { savePost, fetchNewsPost };
