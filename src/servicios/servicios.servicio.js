import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioServicios = {
    getServicios,
    nuevoServicio,
    getConfiguracion,
    modificarServicio,
    eliminarServicio
};

function nuevoServicio(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/servicios/${body.categoria.toLowerCase()}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}


function getServicios() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion()
    };
    return fetch(`/servicios`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function getConfiguracion(){
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion()
    };
    return fetch(`/servicios/categorias`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function modificarServicio(body) {
    const requestOptions = {
        method: 'PUT',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/servicios`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function eliminarServicio(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: headerAutenticacion(),
    };
    return fetch(`/servicios/${id}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}