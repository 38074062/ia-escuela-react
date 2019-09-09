import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Router, Route } from "react-router-dom";
import { servicioAutenticacion } from './servicios';
import { history } from "./utilidades";
import Home from './pantallas/Home';
import Login from './pantallas/Login';
import BarraNavegacion from './componentes/BarraNavegacion';
import { RutaPrivada } from './rutas/RutaPrivada';


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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioActual: null
    };
  }

  componentDidMount() {
    servicioAutenticacion.usuarioActual.subscribe(x => this.setState({ usuarioActual: x }));
  }

  render = () => {
    const { usuarioActual } = this.state;
    return (
      <Router history={history}>
        {usuarioActual &&
          <React.Fragment>
            <BarraNavegacion />
          </React.Fragment>
        }
        <Route path="/login" component={Login} />
        <RutaPrivada path="/" exact component={Home} />
      </Router>
    )
  }
}

export default withStyles(styles)(App);