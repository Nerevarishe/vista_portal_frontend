import React from "react";

import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";

import NavigationBar from "./NavigationBar";

import NewsPage from "./NewsPage/NewsPage";
import LoginPage from "./LoginPage";
import Logout from "./LoginPage/Logout";
import AddNewsPage from "./NewsPage/AddNewsPage";
import Defectura from "./Defectura";
import NotFound from "./NotFound";

import Store from "./stores/store";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Store>
          <Router history={history}>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={NewsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/news/add_news_post" component={AddNewsPage} />
              <Route exact path="/defectura" component={Defectura} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
      </Store>
    </div>
  );
}

export default App;
export { history };
