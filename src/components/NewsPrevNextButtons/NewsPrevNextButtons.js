import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NewsPrevNextButtons = (props) => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto" className="mt-1">
        <Button
          onClick={props.prevPageHandler}
          disabled={props.postsPageHasPrev}
        >
          Prev Page
        </Button>
      </Col>
      <Col xs="auto" className="mt-1">
        <Button
          onClick={props.nextPageHandler}
          disabled={props.postsPageHasNext}
        >
          Next Page
        </Button>
      </Col>
    </Row>
  );
};

export default NewsPrevNextButtons;
