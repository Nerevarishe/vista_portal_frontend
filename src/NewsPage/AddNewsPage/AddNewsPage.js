import React, { Component } from "react";
import { Redirect } from "react-router"

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../CKEditorConf";

import Save from "../../components/buttons/Save";
import {axiosInstance as axios} from "../../axiosInstance";

class AddNewsPage extends Component {
  state = {
    newsPost: '',
    redirectToNewsPage: false
  };

  saveDataHandler = () => {
    axios.post('/news/', {"postBody": this.state.newsPost})
      .then(response => {
        console.log(response);
        this.setState({redirectToNewsPage: true})})
      .catch(error => console.log(error))
  };

  render() {
    if (this.state.redirectToNewsPage) {
      return <Redirect to={'/news/'}/>
    }
    return (
      <div>
        <p>Add News Page</p>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={this.props.data}
          onInit={editor => {
            editor.editing.view.focus()
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            this.setState({newsPost: data})
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
        <Save btnClicked={this.saveDataHandler}/>
      </div>
    );
  }
}

export default AddNewsPage;
