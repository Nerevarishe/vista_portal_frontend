import React from "react";

import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";

import NavigationBar from "./components/NavigationBar";

import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import LoginPage from "./containers/LoginPage";
import NewsPage from "./containers/NewsPage/NewsPage";
import AddNewsPage from "./containers/NewsPage/AddNewsPage";
import DefecturaPage from "./containers/DefecturaPage";

import NotFoundPage from "./containers/NotFoundPage";
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
              <Route exact path="/login/auth" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/news/add_news_post" component={AddNewsPage} />
              <Route exact path="/defectura" component={DefecturaPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Router>
      </Store>
    </div>
  );
}

export default App;
export { history };
