import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import NewsPostCardButtons from "../../components/NewsPostCardButtons";
import NewsPrevNextButtons from "../../components/NewsPrevNextButtons";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: "auto",
  },
});

const NewsPage = () => {
  const [state, dispatch] = useContext(Context);

  const [newsPostState, setNewsPostsState] = useState({
    news: [],
    postsPageHasNext: false,
    postsPageHasPrev: false,
  });
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [needFetchNews, setNeedFetchNews] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "RESET_POST" });
    const fetchData = async () => {
      const response = await fetchNews(page, perPage);
      setNewsPostsState({
        news: response.data["posts"],
        postsPageHasNext: response.data["postsPageHasNext"],
        postsPageHasPrev: response.data["postsPageHasPrev"],
      });
    };
    fetchData();
  }, [page, perPage, needFetchNews]);

  const editNewsHandler = (id) => {
    dispatch({ type: "EDIT_POST", data: id });
    history.push("/news/add_news_post");
  };

  const deleteNewsHandler = (id) => {
    dispatch({
      type: "DELETE_NEWS_POST_MODAL",
      data: [
        // Array that contains:
        // Element id that must be deleted
        id,
        // function, which exec when button 'Yes' pressed in modal
        async () => {
          const response = await deleteNewsPost(id);
          if (response.status === 200) {
            dispatch({ type: "RESET_MODAL" });
            setNeedFetchNews((prevState) => prevState + 1);
          }
          dispatch({ type: "RESET_MODAL" });
        },
        // function, which exec when button 'No' pressed in modal
        () => {
          dispatch({ type: "RESET_MODAL" });
        },
      ],
    });
  };

  const prevPageHandler = () => {
    // Disable next and prev post buttons to prevent multi click on buttons
    setNewsPostsState({
      news: [...newsPostState["news"]],
      postsPageHasNext: false,
      postsPageHasPrev: false,
    });
    setPage((prevState) => prevState - 1);
  };

  const nextPageHandler = () => {
    // Disable next and prev post buttons to prevent multi click on buttons
    setNewsPostsState({
      news: [...newsPostState["news"]],
      postsPageHasNext: false,
      postsPageHasPrev: false,
    });
    setPage((prevState) => prevState + 1);
  };

  const redirectToAddNewsPage = () => {
    history.push("/news/add_news_post");
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"flex-start"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={redirectToAddNewsPage}
          >
            Add News Button
          </Button>
        </Grid>
        <Grid item xs={12}>
          <NewsPrevNextButtons
            postsPageHasPrev={!newsPostState["postsPageHasPrev"]}
            prevPageHandler={prevPageHandler}
            postsPageHasNext={!newsPostState["postsPageHasNext"]}
            nextPageHandler={nextPageHandler}
          />
        </Grid>
        {newsPostState.news.map((post) => (
          <Grid item xs={12} key={post["_id"]["$oid"]}>
            <Card className={classes.root}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <CardContent>
                    <p>
                      {moment(post["date_created"]["$date"])
                        .local()
                        .format("DD-MM-YYYY HH:mm")}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{ __html: post["post_body"] }}
                    />
                  </CardContent>
                  <Grid item xs={12}>
                    <CardActions>
                      <NewsPostCardButtons
                        id={post["_id"]["$oid"]}
                        handleEdit={editNewsHandler}
                        handleDelete={deleteNewsHandler}
                      />
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <NewsPrevNextButtons
            postsPageHasPrev={!newsPostState["postsPageHasPrev"]}
            prevPageHandler={prevPageHandler}
            postsPageHasNext={!newsPostState["postsPageHasNext"]}
            nextPageHandler={nextPageHandler}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NewsPage;
