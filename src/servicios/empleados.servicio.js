import { manejarRespuesta } from '../utilidades';
import { headerAutenticacion } from '../utilidades/headerAutenticacion';

export const servicioEmpleados = {
    altaEmpleado,
    listarEmpleados,
    listarCargos,
    agregarCargaHoraria,
    eliminarEmpleado,
    modificarEmpleado,
    liquidarSueldos
};

function altaEmpleado(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/empleados`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function agregarCargaHoraria(body) {
    const requestOptions = {
        method: 'POST',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/empleados/${body.idEmpleado}/cargaHoraria`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function listarEmpleados() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };
    return fetch(`/empleados`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function listarCargos() {
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };
    return fetch(`/cargos`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function modificarEmpleado(body) {
    const requestOptions = {
        method: 'PUT',
        headers: headerAutenticacion(),
        body: JSON.stringify(body)
    };
    return fetch(`/empleados`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function eliminarEmpleado(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: headerAutenticacion(),
    };
    return fetch(`/empleados/${id}`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}

function liquidarSueldos(){
    const requestOptions = {
        method: 'GET',
        headers: headerAutenticacion(),
    };

    fetch(`/empleados/sueldos`, requestOptions)
        .then(manejarRespuesta)
        .then(respuesta => {
            return respuesta;
        });
}