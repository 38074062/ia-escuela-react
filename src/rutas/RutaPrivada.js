import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { servicioAutenticacion } from '../servicios';

export const RutaPrivada = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const usuarioActual = servicioAutenticacion.valorUsuarioActual;
        if (!usuarioActual) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)