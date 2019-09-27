import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioTitulares = {
    nuevoTitular,
    listarTitulares,
    getTitular,
    registrarCobro,
    modificarTitular,
    eliminarTitular
};

function nuevoTitular(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/titulares`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function listarTitulares() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };
    return fetch(`/titulares`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function getTitular(id) {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };
    return fetch(`/titulares/${id}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function registrarCobro(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/titulares/cobro`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function modificarTitular(body) {
    const requestOptions = {
        method: 'PUT',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/titulares`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function eliminarTitular(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: headerAutenticacion(),
    };
    return fetch(`/titulares/${id}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}