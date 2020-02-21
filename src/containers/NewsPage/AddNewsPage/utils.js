import { axiosInstance as axios } from "../../../configs/axiosInstance";
import { loadAccessToken } from "../../../Auth/utils";

const savePost = async (state, newsPost) => {
  const accessToken = await loadAccessToken();
  const data = {
    "postBody": newsPost
  };
  const conf = {
    headers: {
      "Authorization": `Bearer ${accessToken["accessToken"]}`
    }
  };
  if (state.newsPosts["editorMode"] === 'create') {
    axios.post('/news/', data, conf)
      .then()
      .catch()
  } else if (state.newsPosts["editorMode"] === 'edit') {
    axios.put(`/news/${state.editPostId}`, data, conf)
      .then(() => {
        state.newsPosts["editorMode"] = 'create';
      })
      .catch()
  }
};

const fetchData = async (state, setNewsPost) => {
  if (state.editorMode === 'edit') {
    await axios.get('/news/' + state.editPostId)
      .then(response => {
        setNewsPost(response.data.post["post_body"]);
      })
      .catch(error => console.log(error))
  }
};

export { savePost, fetchData }
