import React from 'react';
import { Router, Route } from "react-router-dom";
import { servicioAutenticacion } from './servicios';
import { history } from "./utilidades";
import Home from './pantallas/home/Home';
import Login from './pantallas/Login';
import { RutaPrivada } from './rutas/RutaPrivada';
import { Snackbar } from '@material-ui/core';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioActual: null,
      snackbarVisible: false
    };
  }

  componentDidMount() {
    servicioAutenticacion.usuarioActual.subscribe(x => this.setState({ usuarioActual: x }));
  }

  mostrarMensaje = (mensaje) => {
    this.setState({ snackbarVisible: true, mensaje: mensaje });
  }

  render = () => {
    const { usuarioActual } = this.state;
    return (
      <Router history={history}>
        {usuarioActual &&
          <React.Fragment>
            <Home history={history} mostrarMensaje={this.mostrarMensaje} />
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={this.state.snackbarVisible}
              onClose={() => this.setState({ snackbarVisible: false, mensaje: "" })}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.mensaje}</span>}
            />
          </React.Fragment>
        }
        <RutaPrivada path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}