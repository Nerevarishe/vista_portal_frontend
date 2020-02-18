import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import NavigationBar from "./NavigationBar";

import NewsPage from "./NewsPage/NewsPage";
import LoginPage from "./LoginPage";
import AddNewsPage from "./NewsPage/AddNewsPage";
import Defectura from "./Defectura";
import NotFound from "./NotFound";
import EditPostStore from "./stores/EditPostStore";
import AuthStore from "./stores/AuthStore";
import Logout from "./LoginPage/Logout";

function App() {
  return (
    <div className="App">
      <AuthStore>
        <EditPostStore>
          <Router>
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
        </EditPostStore>
      </AuthStore>
    </div>
  );
}

export default App;
