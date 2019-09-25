import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioFacturacion = {
    generarFacturas,
    listarFacturas
};

function generarFacturas() {
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

function listarFacturas() {
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