import React from "react";
import Button from "@material-ui/core/Button";

const NewsPrevNextButtons = (props) => {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={props.prevPageHandler}
        disabled={props.postsPageHasPrev}
      >
        Prev Page
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={props.nextPageHandler}
        disabled={props.postsPageHasNext}
      >
        Next Page
      </Button>
    </div>
  );
};

export default NewsPrevNextButtons;
