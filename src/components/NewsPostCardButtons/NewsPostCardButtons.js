import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    height: 80,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const NewsPostCardButtons = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      handleAction: (event) => handleEdit(event.target.id)
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      handleAction: (event) => handleDelete(event.target.id)
    }

  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    // console.log(`Clicked Edit\n${props.id}`);
    props.handleEdit(props.id);
  };

  const handleDelete = () => {
    // console.log(`Clicked Delete\n${props.id}`);
    props.handleDelete(props.id);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="news"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        // TODO: Redirect to edit news page on delete! BUG!

        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleAction}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default NewsPostCardButtons;
