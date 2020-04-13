import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { Link, Route, Router, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";

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
  let navBarUser = username ? (
    <React.Fragment>
      <Nav.Link>{username}</Nav.Link>{" "}
      <LinkContainer to={"/logout"}>
        <Nav.Link>Выйти</Nav.Link>
      </LinkContainer>
    </React.Fragment>
  ) : (
    <LinkContainer to={"/login"}>
      <Nav.Link>Войти</Nav.Link>
    </LinkContainer>
  );
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to={"/news"}>
              <Nav.Link>Новости</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/defectura"}>
              <Nav.Link>Дефектура</Nav.Link>
            </LinkContainer>
            <Nav.Link href="/wiki" target="_blank">
              Wiki
            </Nav.Link>
            {/*TODO: Add some link to wiki in dropdown menu*/}
            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
            {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.2">*/}
            {/*    Another action*/}
            {/*  </NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*  <NavDropdown.Divider />*/}
            {/*  <NavDropdown.Item href="#action/3.4">*/}
            {/*    Separated link*/}
            {/*  </NavDropdown.Item>*/}
            {/*</NavDropdown>*/}
          </Nav>
          <Nav>{navBarUser}</Nav>
        </Navbar.Collapse>
      </Navbar>
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
  );
};

export default Navigation;
