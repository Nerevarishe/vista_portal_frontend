import React, { Component } from "react";

import { axiosInstance as axios } from "../axiosInstance";

import NextButton from "../components/buttons/NextButton";
import PrevButton from "../components/buttons/PrevButton";

import classes from "./newsPage.module.css";

class NewsPage extends Component {
  state = {
    news: [],
    page: 1,
    limit: 10
  };

  componentDidMount(prevState) {
    this.fetchNews();
  }

  componentDidUpdate(prevState) {
    if (prevState.page === this.state.page) {
      this.fetchNews();
    }
  }

  fetchNews = () => {
    axios
      .get("/news/?page=" + this.state.page + "&limit=" + this.state.limit)
      .then(response => {
        this.setState({ news: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  prevButtonHandler = prevState => {
    this.setState(prevState => ({ page: prevState.page - 1 }));
  };

  nextButtonHandler = prevState => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <p>News Page</p>
        {this.state.news.map(post => (
          <div key={post.id} className={classes.newsPostCard}>
            <p>{post.postBody}</p>
          </div>
        ))}
        <PrevButton btnClicked={this.prevButtonHandler} />
        <NextButton btnClicked={this.nextButtonHandler} />
      </div>
    );
  }
}

export default NewsPage;
