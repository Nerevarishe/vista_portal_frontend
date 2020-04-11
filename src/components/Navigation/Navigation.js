import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { Link, Route, Router, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewsPage from "../../containers/NewsPage";
import LoginPage from "../../containers/LoginPage";
import Login from "../../Auth/Login";
import Logout from "../../Auth/Logout";
import AddNewsPage from "../../containers/NewsPage/AddNewsPage";
import DefecturaPage from "../../containers/DefecturaPage";
import NotFoundPage from "../../containers/NotFoundPage";

const Navigation = (props) => {
  const [state, dispatch] = useContext(Context);
  const username = state.auth["username"];
  let navBarUser = <Tab label="Войти" value="/Login" component={Link} to={'/login'} />;
  if (username) {
    navBarUser =
      <React.Fragment>
        <Tab label={username} disabled />
        <Tab label="Выйти" value="/Logout" component={Link} to={'/logout'} />
      </React.Fragment>
  }

  return (
    <Route
      path="/"
      render={({ location }) => (
        <React.Fragment>
          <AppBar position="sticky">
            <Tabs value={location.pathname}>
              <Tab label="Новости" value="/" component={Link} to={'/'} />
              <Tab label="Деффектура" value="/defectura" component={Link} to={'/defectura'} />
              <Tab label="Вики" value="/wiki" component={Link} to={'/wiki'} target="_blank" />
              {navBarUser}
            </Tabs>
          </AppBar>
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
        </React.Fragment>
      )}
    />
  );
};

export default Navigation;
