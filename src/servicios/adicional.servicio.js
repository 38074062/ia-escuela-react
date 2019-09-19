import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioAutenticacion = {
    listarAdicionales
};

function listarAdicionales() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion()
    };
    return fetch(`/adicionales`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}
