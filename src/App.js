import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import NavigationBar from "./NavigationBar";

import NewsPage from "./NewsPage/newsPage";
import AddNewsPage from "./NewsPage/AddNewsPage";

import Defectura from "./Defectura";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={NewsPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/news/add_news_post" component={AddNewsPage} />
          <Route path="/defectura" component={Defectura} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
