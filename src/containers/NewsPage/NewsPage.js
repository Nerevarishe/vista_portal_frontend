import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import NewsPostCardButtons from "../../components/NewsPostCardButtons";

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
    dispatch({type: 'RESET_POST'});
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

  const editNewsHandler = (id) => {
    dispatch({type: 'EDIT_POST', data: id});
    history.push("/news/add_news_post");
  };

  const deleteNewsHandler = (id) => {
    dispatch({type: 'DELETE_NEWS_POST_MODAL', data: [
        // Array that contains:
        // Element id that must be deleted
        id,
        // function, which exec when button 'Yes' pressed in modal
        async () => {
          const response = await deleteNewsPost(id);
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
        <Button
          variant="outlined"
          color="primary"
          onClick={redirectToAddNewsPage}
        >
          Add News Button
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={prevPageHandler}
          disabled={!newsPostState["postsPageHasPrev"]}
        >
          Prev Page
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={nextPageHandler}
          disabled={!newsPostState["postsPageHasNext"]}
        >
            Next Page
        </Button>
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
                {/*<Button id={post["_id"]["$oid"]} clicked={editNewsHandler.bind(this)} text="Edit" />*/}
                {/*<Button id={post["_id"]["$oid"]} clicked={deleteNewsHandler.bind(this)} text="Delete" />*/}
                <NewsPostCardButtons
                  id={post["_id"]["$oid"]}
                  handleEdit={editNewsHandler.bind(this)}
                  handleDelete={deleteNewsHandler.bind(this)}
                />
              </div>
            </Paper>
          </Grid>
        ))}
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          onClick={prevPageHandler}
          disabled={!newsPostState["postsPageHasPrev"]}
        >
          Prev Page
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={nextPageHandler}
          disabled={!newsPostState["postsPageHasNext"]}
        >
          Next Page
        </Button>
      </React.Fragment>
  );
};

export default NewsPage;
