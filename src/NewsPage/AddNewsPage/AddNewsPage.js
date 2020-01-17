import React, { useState } from "react";
import { Redirect } from "react-router"

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../CKEditorConf";

import Save from "../../components/buttons/Save";
import {axiosInstance as axios, authToken} from "../../axiosInstance";

const AddNewsPage = (props) => {

  const [newsPost, setNewsPost] = useState('');
  const [redirectToNewsPage, setRedirectToNewsPage] = useState(false);

  const saveDataHandler = () => {
    setNewsPost(prevState =>
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
    )

    };

  if (redirectToNewsPage) {
    return <Redirect to={'/news/'}/>
  }
  return (
    <div>
      <p>Add News Page</p>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={props.data}
        onInit={editor => {
          editor.editing.view.focus()
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({event, editor, data});
          setNewsPost(data)
        }}
      />
      <Save btnClicked={saveDataHandler}/>
    </div>
  );
};

export default AddNewsPage;
