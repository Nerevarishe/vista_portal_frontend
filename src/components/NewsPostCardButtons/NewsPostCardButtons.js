import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    height: 45,
    transform: 'translateZ(0px)',
    flexGrow: 1
  }
}));

const NewsPostCardButtons = (props) => {
  const classes = useStyles();

  const handleEdit = () => {
    props.handleEdit(props.id);
  };

  const handleDelete = () => {
    props.handleDelete(props.id);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleEdit}><EditIcon /></Button>
      <Button variant="outlined" color="secondary" onClick={handleDelete}><DeleteIcon /></Button>
    </div>
  );
};

export default NewsPostCardButtons;
