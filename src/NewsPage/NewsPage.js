import React, { Component } from "react";

import { Redirect } from "react-router";

import { axiosInstance as axios } from "../axiosInstance";
import moment from "moment";

import AddNewsPostButton from "../components/buttons/AddNewsPostButton";
import NextButton from "../components/buttons/NextButton";
import PrevButton from "../components/buttons/PrevButton";
import Edit from "../components/buttons/Edit";
import Delete from "../components/buttons/Delete";

import classes from "./NewsPage.module.css";


class NewsPage extends Component {
  state = {
    news: [],
    postsPageHasNext: null,
    postsPageHasPrev: null,
    page: 1,
    per_page: 10,
    redirect: false,
    editedPostId: ''
  };

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.page !== this.state.page) {
      this.fetchNews();
    }
  }

  fetchNews = () => {
    axios
      .get("/news?page=" + this.state.page + "&per_page=" + this.state.per_page)
      .then(response => {
        this.setState({
          news: response.data["posts"],
          postsPageHasNext: response.data["postsPageHasNext"],
          postsPageHasPrev: response.data["postsPageHasPrev"]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setRedirect = () => {
    this.setState({redirect: true });
  };

  editNewsHandler = (newsPostId) => {
    this.setState({
      editedPostId: newsPostId,
      redirect: true
    })
  };

  deleteNewsHandler = () => {

  };

  prevButtonHandler = prevState => {
    this.setState(prevState => ({ page: prevState.page - 1 }));
  };

  nextButtonHandler = prevState => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/news/add_news_post" />;
    }
    return (
      <div>
        <p>News Page</p>
        <AddNewsPostButton btnClicked={this.setRedirect} />
        {this.state.news.map(post => (
          <div key={post["_id"]["$oid"]} className={classes.newsPostCard}>
            <p>
              {moment(post["date_created"]["$date"]).local().format("DD-MM-YYYY HH:mm")}
            </p>
            <p dangerouslySetInnerHTML={{ __html: post["post_body"] }} />
            <div>
              <Edit btnClicked={this.editNewsHandler.bind(post["_id"]["$oid"])} />
              <Delete btnClicked={this.deleteNewsHandler}/>
            </div>
          </div>
        ))}
        <PrevButton
          btnClicked={this.prevButtonHandler}
          isDisabled={this.state.postsPageHasNext}
        />
        <NextButton
          btnClicked={this.nextButtonHandler}
          isDisabled={this.state.postsPageHasPrev}
        />
      </div>
    );
  }
}

export default NewsPage;
