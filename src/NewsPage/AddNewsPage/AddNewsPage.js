import React, {useState, useContext, useEffect} from "react";
import { history } from "../../App"

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../CKEditorConf";

import Save from "../../components/buttons/Save";
import { Context } from "../../stores/EditPostStore";

import { savePost, fetchData } from "./utils";

const AddNewsPage = () => {
  const [state] = useContext(Context);

  const [newsPost, setNewsPost] = useState('');

  useEffect(() =>{
    fetchData(state, setNewsPost);
  }, [state]);

  const savePostHandler = () => {
    savePost(state, newsPost)
      .then(() => {
        console.log("Redirect from save post");
        history.push("/news");
      })
      .catch();
  };

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
