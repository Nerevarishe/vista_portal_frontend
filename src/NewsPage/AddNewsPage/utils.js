import { axiosInstance as axios } from "../../axiosInstance";


const savePost = (state, newsPost, setRedirectToNewsPage) => {
  if (state.editorMode === 'create') {
    axios.post('/news/', {
      "postBody": newsPost
    })
      .then(response => {
        setRedirectToNewsPage(true)
      })
      .catch(error => console.log(error))
  } else if (state.editorMode === 'edit') {
    axios.put('/news/' + state.editPostId, {
      "postBody": newsPost
    })
      .then(response => {
        state.editorMode = 'create';
        setRedirectToNewsPage(true);
      })
      .catch(error => console.log(error))
  }
};

const fetchData = (state, setNewsPost) => {
  if (state.editorMode === 'edit') {
    async function fetchData() {
      await axios.get('/news/' + state.editPostId)
        .then(response => {
          console.log(response.data);
          setNewsPost(response.data.post["post_body"]);
        })
        .catch(error => console.log(error))
    }}
};

export { savePost, fetchData }
