import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Router, Route } from "react-router-dom";
import { Snackbar } from '@material-ui/core';
import BarraNavegacion from '../componentes/BarraNavegacion';
import { servicioAutenticacion } from '../servicios';

let drawerWidth = 240;

let styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
});

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuLateralAbierto: true,
      modalAbierto: false,
      snackbarAbierto: false,
      mensaje: '',
      usuarioActual: servicioAutenticacion.valorUsuarioActual
    };

  }

  handleDrawerOpen = () => {
    this.setState({ menuLateralAbierto: true });
  };

  handleDrawerClose = () => {
    this.setState({ menuLateralAbierto: false });
  };

  onLogout = () => {
    servicioAutenticacion.cerrarSesion();
  }

  handleModalClose = (value) => {
    if (value instanceof String && value !== '') {
      this.setState({ mensaje: value, snackbarAbierto: true });
    }
    this.setState({ modalAbierto: false });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarAbierto: false });
  };

  render = () => {
    let { classes } = this.props;
    if (this.state.usuarioActual) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.menuLateralAbierto && classes.appBarShift)}        >
            <Toolbar disableGutters={!this.state.menuLateralAbierto} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.menuLateralAbierto && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
              </Typography>
              <Button color="secondary" onClickCapture={this.onLogout.bind(this)}>
                Cerrar sesión </Button>
            </Toolbar>
          </AppBar>
          <Router history={this.props.history}>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.menuLateralAbierto && classes.drawerPaperClose),
              }}
              open={this.state.menuLateralAbierto}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <Divider />
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={this.state.snackbarAbierto}
                onClose={this.handleSnackbarClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.mensaje}</span>}
              />
            </main>
          </Router>
        </div>
      );
    }
    else {
      return <Router>
        <BarraNavegacion />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
      </Router>
    }
  }
}

export default withStyles(styles)(Home);