export function validarDatos(titulo, descripcion) {
    if (titulo.length === 0 || descripcion.length === 0) {
        return true;
    } else {
        return false;
    }
}