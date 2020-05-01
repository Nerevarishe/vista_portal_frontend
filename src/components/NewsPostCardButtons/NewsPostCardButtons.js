import React from "react";
import Button from "react-bootstrap/Button";

const NewsPostCardButtons = (props) => {
  const handleEdit = () => {
    props.handleEdit(props.id);
  };

  const handleDelete = () => {
    props.handleDelete(props.id);
  };

  return (
    <div>
      <Button className="m-1" onClick={handleEdit}>
        Edit
      </Button>
      <Button className="m-1" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default NewsPostCardButtons;
