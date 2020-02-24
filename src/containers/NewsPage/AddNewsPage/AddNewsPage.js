import React, {useState, useContext, useEffect} from "react";
import { history } from "../../../App";

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../../configs/CKEditorConf";

import { Context } from "../../../stores/store";

import { savePost, fetchData } from "./utils";
import Button from "../../../components/Button";
import PrivateRoute from "../../../Auth/PrivateRoute";

const AddNewsPage = () => {
  const [state, dispatch] = useContext(Context);
  const [newsPost, setNewsPost] = useState('');

  useEffect(() =>{
    fetchData(state, setNewsPost)
      .then()
      .catch();
  }, [state]);

  const savePostHandler = () => {
    savePost(state, newsPost)
      .then(() => {
        history.push("/news");
      })
      .catch(() => {
      });
  };

  return (
    <PrivateRoute>
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
          // console.log({event, editor, data});
          setNewsPost(data)
        }}
      />
      <Button clicked={savePostHandler} text="Save"/>
    </PrivateRoute>
  );
};

export default AddNewsPage;
