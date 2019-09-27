import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioInscripciones = {
    nuevaInscripcion,
    modificarInscripcion,
    listarInscripciones,
    eliminarInscripcion
};

function nuevaInscripcion(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/inscripcion`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function modificarInscripcion(body) {
    const requestOptions = {
        method: 'PUT',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/inscripcion`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function listarInscripciones() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };
    return fetch(`/inscripcion`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function eliminarInscripcion(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: headerAutenticacion(),
    };
    return fetch(`/inscripcion/${id}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}