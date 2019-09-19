import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioTitulares = {
    nuevoTitular,
    listarTitulares
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