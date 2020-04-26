import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ModeratorPanel from "../../components/ModeratorPanel";
import NewsPostCardButtons from "../../components/NewsPostCardButtons";
import NewsPrevNextButtons from "../../components/NewsPrevNextButtons";

import "./NewsPage.css";

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
      <Container>
        <ModeratorPanel>
          <Button onClick={redirectToAddNewsPage}>Add News Button</Button>
        </ModeratorPanel>
        <NewsPrevNextButtons
          postsPageHasPrev={!newsPostState["postsPageHasPrev"]}
          prevPageHandler={prevPageHandler}
          postsPageHasNext={!newsPostState["postsPageHasNext"]}
          nextPageHandler={nextPageHandler}
        />
        <div className="ck-content">
          {newsPostState.news.map((post) => (
            <Card key={post._id["$oid"]} className="mt-3">
              <Card.Header>
                <p>
                  {moment(post["date_created"]["$date"])
                    .local()
                    .format("DD-MM-YYYY HH:mm")}
                </p>
              </Card.Header>
              <Card.Body>
                <p dangerouslySetInnerHTML={{ __html: post["post_body"] }} />
              </Card.Body>
              <Card.Footer>
                <NewsPostCardButtons
                  id={post["_id"]["$oid"]}
                  handleEdit={editNewsHandler}
                  handleDelete={deleteNewsHandler}
                />
              </Card.Footer>
            </Card>
          ))}
        </div>
        <NewsPrevNextButtons
          postsPageHasPrev={!newsPostState["postsPageHasPrev"]}
          prevPageHandler={prevPageHandler}
          postsPageHasNext={!newsPostState["postsPageHasNext"]}
          nextPageHandler={nextPageHandler}
        />
      </Container>
    </React.Fragment>
  );
};

export default NewsPage;
