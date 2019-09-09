import { BehaviorSubject } from 'rxjs';
import { obtenerToken } from '../utilidades';

const usuarioActualSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('usuarioActual')));

export const servicioAutenticacion = {
    iniciarSesion,
    cerrarSesion,
    usuarioActual: usuarioActualSubject.asObservable(),
    get valorUsuarioActual () { return usuarioActualSubject.value }
};

function iniciarSesion(nombreUsuario, contrasenia) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, contrasenia })
    };
    return fetch(`/login`, requestOptions)
        .then(obtenerToken)
        .then(token => {
            localStorage.setItem('token', token);
            usuarioActualSubject.next(token);
            return token;
        });
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    usuarioActualSubject.next(null);
}
