import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
  notFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  errorText: {
    color: '#ED4337',
  },
  messageText: {
    fontSize: '1.5rem',
    marginTop: 20,
    color: '#333',
  },
  button: {
    marginTop: 20,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFoundContainer}>
      <Typography variant="h3" className={classes.errorText}>
        404 Page Not Found
      </Typography>
      <Typography variant="body1" className={classes.messageText}>
        Sorry, the page you are looking for does not exist.
      </Typography>
    </div>
  );
};

export default NotFound;
