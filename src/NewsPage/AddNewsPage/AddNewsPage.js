import React, {useState, useContext, useEffect} from "react";
import { Redirect } from "react-router"

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../CKEditorConf";

import Save from "../../components/buttons/Save";
import { Context } from "../../stores/EditPostStore";

import { savePost, fetchData } from "./utils";

const AddNewsPage = (props) => {
  const [state] = useContext(Context);

  const [newsPost, setNewsPost] = useState('');
  const [redirectToNewsPage, setRedirectToNewsPage] = useState(false);

  const savePostHandler = () => {
    savePost(state, newsPost, setRedirectToNewsPage);
  };

  useEffect(() =>{
    fetchData(state, setNewsPost);
  }, [state]);

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
          // console.log({event, editor, data});
          setNewsPost(data)
        }}
      />
      <Save btnClicked={savePostHandler}/>
    </div>
  );
};

export default AddNewsPage;
