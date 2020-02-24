import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";
import Button from "../../components/Button";

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

  useEffect( () =>{
    fetchNews(page, perPage, setNewsPostsState, setNeedFetchNews)
      .then()
      .catch()
  }, [page, perPage, needFetchNews]);

  const editNewsHandler = (event) => {
    dispatch({type: 'EDIT_POST', data: event.target.id});
    history.push("/news/add_news_post");
  };

  const deleteNewsHandler = (event) => {
    // TODO: Implement modal with delete confirmation
    event.persist();
    // dispatch({type: 'DELETE_POST', data: event.target.id});
    deleteNewsPost(event, setNeedFetchNews)
      .then()
      .catch();
  };

  const prevPageHandler = () => {
    setNewsPostsState({
      news: [...newsPostState["news"]],
      postsPageHasNext: false,
      postsPageHasPrev: false
    });
    setPage(prevState => prevState - 1);
  };

  const nextPageHandler = () => {
    setNewsPostsState({
      news: [...newsPostState["news"]],
      postsPageHasNext: false,
      postsPageHasPrev: false
    });
    setPage(prevState => prevState + 1);
  };

  const redirectToAddNewsPage = () => {
    history.push("/news/add_news_post");
  };

  return (
      <React.Fragment>
        <p>News Page</p>
        <Button clicked={redirectToAddNewsPage} text="Add News Button" />
        {newsPostState.news.map(post => (
          <div key={post["_id"]["$oid"]} className={classes.newsPostCard}>
            <p>
              {moment(post["date_created"]["$date"]).local().format("DD-MM-YYYY HH:mm")}
            </p>
            <p dangerouslySetInnerHTML={{ __html: post["post_body"] }} />
            <div>
              <Button id={post["_id"]["$oid"]} clicked={editNewsHandler.bind(this)} text="Edit" />
              <Button id={post["_id"]["$oid"]} clicked={deleteNewsHandler.bind(this)} text="Delete" />
            </div>
          </div>
        ))}
        <br/>
        <Button
          clicked={prevPageHandler}
          btnDisabled={!newsPostState["postsPageHasPrev"]}
          text="Prev Page"
        />
        <Button
          clicked={nextPageHandler}
          btnDisabled={!newsPostState["postsPageHasNext"]}
          text="Next Page"
        />
      </React.Fragment>
  );
};

export default NewsPage;
