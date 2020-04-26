import React, { useState, useContext } from "react";
import { history } from "../../App";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    const data = {
      username: username,
      password: password,
    };
    history.push("/login/auth", data);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs="6" className="m-auto">
            <Card>
              <Card.Body>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} xs="auto" className="m-auto">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        placeholder="Enter username"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="mt-2">
                    <Form.Group as={Col} xs="auto" className="m-auto">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="mt-2">
                    <Button onClick={loginHandler} className="m-auto">
                      Log In
                    </Button>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
