import { servicioAutenticacion } from '../servicios/autenticacion.servicio';

export function headerAutenticacion() {
    const usuarioActual = servicioAutenticacion.valorUsuarioActual;
    if (usuarioActual) {
        return { Authorization: `${usuarioActual}`, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}