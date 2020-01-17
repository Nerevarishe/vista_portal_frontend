import React, {useState, useContext, useEffect} from "react";
import { Redirect } from "react-router"

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../CKEditorConf";

import Save from "../../components/buttons/Save";
import { axiosInstance as axios, authToken } from "../../axiosInstance";
import { Context } from "../../stores/EditPostStore";

const AddNewsPage = (props) => {
  const [state] = useContext(Context);

  const initEditorMode = state.editorMode || 'create';
  const [editorMode] = useState(initEditorMode);

  const [newsPost, setNewsPost] = useState('');
  const [redirectToNewsPage, setRedirectToNewsPage] = useState(false);

  const savePostHandler = () => {
    if (editorMode === 'create') {
      axios.post('/news/', {
        "postBody": newsPost,
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
        .then(response => {
          console.log(response);
          setRedirectToNewsPage(true)
        })
        .catch(error => console.log(error))
    } else if (editorMode === 'edit') {
      axios.put('/news/' + state.editPostId, {
        "postBody": newsPost,
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
        .then(response => {
          console.log(response);
          setRedirectToNewsPage(true)
        })
        .catch(error => console.log(error))
    }
  };

  useEffect(() =>{
    if (editorMode === 'edit') {
      async function fetchData() {
        await axios.get('/news/' + state.editPostId)
          .then(response => {
            console.log(response.data);
            setNewsPost(response.data.post["post_body"]);
          })
          .catch(error => console.log(error))
      }
      fetchData();
    }
  }, [editorMode, state]);

  if (redirectToNewsPage) {
    return <Redirect to={'/news/'}/>
  }
  return (
    <div>
      <p>Add News Page</p>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={newsPost}
        onInit={editor => {
          editor.editing.view.focus();
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({event, editor, data});
          setNewsPost(data)
        }}
      />
      <Save btnClicked={savePostHandler}/>
    </div>
  );
};

export default AddNewsPage;
