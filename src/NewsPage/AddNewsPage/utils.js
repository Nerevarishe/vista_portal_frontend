import { axiosInstance as axios } from "../../axiosInstance";
import { loadAccessToken } from "../../LoginPage/utils";
import { history } from "../../App";

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
  if (state.editorMode === 'create') {
    axios.post('/news/', data, conf)
      .then(() => {
        // history.push('/news');
      })
      .catch()
  } else if (state.editorMode === 'edit') {
    axios.put(`/news/${state.editPostId}`, data, conf)
      .then(() => {
        state.editorMode = 'create';
      })
      .catch()
  }
};

// const fetchData = (state, setNewsPost) => {
//   if (state.editorMode === 'edit') {
//     async function fetchData() {
//       await axios.get('/news/' + state.editPostId)
//         .then(response => {
//           console.log(response.data);
//           setNewsPost(response.data.post["post_body"]);
//         })
//         .catch(error => console.log(error))
//     }}
// };

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
