import React, { useState, useEffect, useContext } from "react";

import { Redirect } from "react-router";

import {authToken, axiosInstance as axios} from "../axiosInstance";
import moment from "moment";

import AddNewsPostButton from "../components/buttons/AddNewsPostButton";
import NextButton from "../components/buttons/NextButton";
import PrevButton from "../components/buttons/PrevButton";
import Edit from "../components/buttons/Edit";
import Delete from "../components/buttons/Delete";
import { Context } from "../stores/EditPostStore";

import classes from "./NewsPage.module.css";


const NewsPage = () => {
  const [state, dispatch] = useContext(Context);

  const [newsPostState, setNewsPostsState] = useState({
    news: [],
    postsPageHasNext: false,
    postsPageHasPrev: false
  });
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [needFetchNews, setNeedFetchNews] = useState(false);
  const [redirectToAddNewsPage, setRedirectToAddNewsPage] = useState(false);

  useEffect(() =>{
    const fetchNews = async () => {
      await axios.get("/news?page=" + page + "&per_page=" + perPage)
        .then(response => {
          setNewsPostsState({
              news: response.data["posts"],
              postsPageHasNext: response.data["postsPageHasNext"],
              postsPageHasPrev: response.data["postsPageHasPrev"]
            }
          );
          setNeedFetchNews(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchNews();
  }, [page, perPage, needFetchNews]);

  const editNewsHandler = (event) => {
    console.log(event.target.id);
    dispatch({type: 'EDIT_POST', data: event.target.id});
    setRedirectToAddNewsPage(true)
  };

  const deleteNewsHandler = (event) => {
    console.log(event.target.id);
    // TODO: Implement modal with delete confirmation
    axios.delete('/news/' + event.target.id, {
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then(response => {
        console.log(response);
        setNeedFetchNews(true);
      })
      .catch(error => console.log(error))
  };

  const prevPageHandler = () => {
    setPage(prevState => prevState - 1);
  };

  const nextPageHandler = () => {
    setPage(prevState => prevState + 1);
  };

  const setRedirect = () => {
    setRedirectToAddNewsPage(true)
  };

  if (redirectToAddNewsPage) {
    return <Redirect to="/news/add_news_post"/>;
  }

  return (
      <div>
        <p>News Page</p>
        <AddNewsPostButton btnClicked={setRedirect} />
        {newsPostState.news.map(post => (
          <div key={post["_id"]["$oid"]} className={classes.newsPostCard}>
            <p>
              {moment(post["date_created"]["$date"]).local().format("DD-MM-YYYY HH:mm")}
            </p>
            <p dangerouslySetInnerHTML={{ __html: post["post_body"] }} />
            <div>
              <Edit id={post["_id"]["$oid"]} btnClicked={editNewsHandler.bind(this)} />
              <Delete id={post["_id"]["$oid"]} btnClicked={deleteNewsHandler.bind(this)}/>
            </div>
          </div>
        ))}
        <PrevButton
          btnClicked={prevPageHandler}
          isDisabled={newsPostState["postsPageHasNext"]}
        />
        <NextButton
          btnClicked={nextPageHandler}
          isDisabled={newsPostState["postsPageHasPrev"]}
        />
      </div>
  );
};

export default NewsPage;
