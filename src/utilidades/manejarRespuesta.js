import { servicioAutenticacion } from '../servicios/autenticacion.servicio'

export function manejarRespuesta(respuesta) {
    return respuesta.text().then(texto => {
        const data = texto && JSON.parse(texto);
        if (!respuesta.ok) {
            if ([401, 403].indexOf(respuesta.status) !== -1) {
                servicioAutenticacion.logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || respuesta.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function obtenerToken(respuesta) {
    return respuesta.text().then(texto => {
        const data = respuesta.headers.get("Authorization");
        if (!respuesta.ok) {
            if ([401, 403].indexOf(respuesta.status) !== -1) {
                servicioAutenticacion.logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || respuesta.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}