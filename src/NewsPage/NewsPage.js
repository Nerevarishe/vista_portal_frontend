import React, { useState, useEffect, useContext } from "react";
import { Context } from "../stores/EditPostStore";
import { history } from "../App";
import { fetchNews, deleteNewsPost } from "./utils";

import moment from "moment";
import AddNewsPostButton from "../components/buttons/AddNewsPostButton";
import NextButton from "../components/buttons/NextButton";
import PrevButton from "../components/buttons/PrevButton";
import Edit from "../components/buttons/Edit";
import Delete from "../components/buttons/Delete";

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
    const fetchData = async () => {
      await fetchNews(page, perPage, setNewsPostsState, setNeedFetchNews);
    };
    fetchData().then().catch();
  }, [page, perPage, needFetchNews]);

  const editNewsHandler = (event) => {
    dispatch({type: 'EDIT_POST', data: event.target.id});
    // TODO: Make redirect to add news page
    history.push("/news/add_news_post");
  };

  const deleteNewsHandler = (event) => {
    // TODO: Implement modal with delete confirmation
    deleteNewsPost(event, setNeedFetchNews);
  };

  const prevPageHandler = () => {
    setPage(prevState => prevState - 1);
  };

  const nextPageHandler = () => {
    setPage(prevState => prevState + 1);
  };

  const redirectToAddNewsPage = () => {
    history.push("/news/add_news_post");
  };

  return (
      <div>
        <p>News Page</p>
        <AddNewsPostButton btnClicked={redirectToAddNewsPage} />
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
