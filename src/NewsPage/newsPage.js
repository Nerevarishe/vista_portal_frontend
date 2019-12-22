import React, { Component } from "react";

import { axiosInstance as axios } from "../axiosInstance";

class NewsPage extends Component {
  state = {
    news: null
  };

  componentDidMount() {
    axios
      .get("/news/")
      .then(response => {
        this.setState({ news: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>News Page</p>
        {this.state.news.map(news => {
          return (
            <div key={news.id}>
              <div>ДАТА НОВОСТИ</div>
              <div>Тело новости</div>
              <div>Кнопки редактирования</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NewsPage;
