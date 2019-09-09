import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

let useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function BarraNavegacion() {
  let classes = useStyles();
  return (
    <nav>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flex: 1 }}>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
}

export default BarraNavegacion;