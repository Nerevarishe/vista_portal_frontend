import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";
import Button from "../../components/Button";

import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";

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
  const [needFetchNews, setNeedFetchNews] = useState(0);

  useEffect( () =>{
    const fetchData = async () => {
      const response = await fetchNews(page, perPage);
      setNewsPostsState({
          news: response.data["posts"],
          postsPageHasNext: response.data["postsPageHasNext"],
          postsPageHasPrev: response.data["postsPageHasPrev"]
        }
      );
    };
    fetchData();
  }, [page, perPage, needFetchNews]);

  const editNewsHandler = (event) => {
    dispatch({type: 'EDIT_POST', data: event.target.id});
    history.push("/news/add_news_post");
  };

  const deleteNewsHandler = (event) => {
    event.persist();
    dispatch({type: 'DELETE_NEWS_POST_MODAL', data: [
        // Array that contains:
        // Element id that must be deleted
        event.target.id,
        // function, which exec when button 'Yes' pressed in modal
        async () => {
          const response = await deleteNewsPost(event);
          if (response.status === 200) {
            dispatch({type: "RESET_MODAL"});
            setNeedFetchNews(prevState => prevState + 1);
          }
          dispatch({type: "RESET_MODAL"});
        },
        // function, which exec when button 'No' pressed in modal
        () => {
          dispatch({type: "RESET_MODAL"})
        }
      ]});
  };

  const prevPageHandler = () => {
    // Disable next and prev post buttons to prevent multi click on buttons
    setNewsPostsState({
      news: [...newsPostState["news"]],
      postsPageHasNext: false,
      postsPageHasPrev: false
    });
    setPage(prevState => prevState - 1);
  };

  const nextPageHandler = () => {
    // Disable next and prev post buttons to prevent multi click on buttons
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
          <Grid container spacing={3} direction={"column"} justify={"flex-start"} alignItems={"center"}>
          {newsPostState.news.map(post => (
            <Grid item xs={12}>
              {/*<div key={post["_id"]["$oid"]} className={classes.newsPostCard}>*/}
              <Paper key={post["_id"]["$oid"]} elevation={5}>
                <p>
                  {moment(post["date_created"]["$date"]).local().format("DD-MM-YYYY HH:mm")}
                </p>
                <p dangerouslySetInnerHTML={{ __html: post["post_body"] }} />
                <div>
                  <Button id={post["_id"]["$oid"]} clicked={editNewsHandler.bind(this)} text="Edit" />
                  <Button id={post["_id"]["$oid"]} clicked={deleteNewsHandler.bind(this)} text="Delete" />
                </div>
              </Paper>
            </Grid>
          ))}
          </Grid>
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
