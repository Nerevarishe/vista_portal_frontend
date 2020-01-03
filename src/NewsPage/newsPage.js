import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { axiosInstance as axios } from "../axiosInstance";

import AddNewsPostButton from "../components/buttons/AddNewsPostButton";
import NextButton from "../components/buttons/NextButton";
import PrevButton from "../components/buttons/PrevButton";

import classes from "./newsPage.module.css";

class NewsPage extends Component {
  state = {
    news: [],
    page: 1,
    limit: 10
  };

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
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

  redirectToAddNewsPostPage = () => {
    console.log("Button Pressed");
    return <Redirect to="/news/add_news/post" />;
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
        <AddNewsPostButton btnClicked={this.redirectToAddNewsPostPage} />
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
