import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const NewsPostCardButtons = (props) => {
  const handleEdit = () => {
    props.handleEdit(props.id);
  };

  const handleDelete = () => {
    props.handleDelete(props.id);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleEdit}
      >
        <EditIcon />
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default NewsPostCardButtons;
