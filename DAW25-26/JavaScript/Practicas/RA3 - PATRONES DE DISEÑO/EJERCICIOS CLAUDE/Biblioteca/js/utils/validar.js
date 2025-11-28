const errores = {
    titulo: "El titulo es invalido (No puede estar vacio)",
    autor: "El autor no pude estar vacio",
    isbn: "El ISBN no es valido (Tiene que tener todo numeros con los guiones bien puestos)",
    año: "El año no puede ser inferior a 1900 y no puede ser mayor que 2025",
    copias: "Las copias no pueden ser menores que 1 y no pueden superar las 10 copias"
}

export function esValido(libroObjeto) { 
    const erroresActivos = [];
    if (!validarTitulo(libroObjeto.titulo)) {
        erroresActivos.push(errores.titulo);
    }
    if (!validarAutor(libroObjeto.autor)) {
        erroresActivos.push(errores.autor);
    }

    if (!validarISBN(libroObjeto.isbn)) {
        erroresActivos.push(errores.isbn);
    }

    if (!validarAñoPublicacion(libroObjeto.añoPublicacion)) {
        erroresActivos.push(errores.año);
    }

    if (!validarcopiasDisponibles(libroObjeto.copiasDisponibles)) {
        erroresActivos.push(errores.copias);
    }

    if (erroresActivos.length === 0) {
        return true;
    } else {
        return erroresActivos;
    }


}



function validarTitulo(titulo) {

    if (titulo.trim().length === 0) {
        return false;
    } else {
        return true;
    }

}

function validarAutor(autor) {
    if (autor.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}

function validarISBN(isbn) {

    isbn = isbn.trim();
    if (isbn.length === 17 && isbn.charAt(3) === "-" && isbn.charAt(5) === "-" && isbn.charAt(11) === "-" && isbn.charAt(15) === "-") {
        for (let i = 0; i < 17; i++) {
            if (!(i === 3 || i === 5 || i === 11 || i === 15)) {
                let digito = isbn.charAt(i);

                if (digito < "0" || digito > "9") {
                    return false;
                }
            }

        }

    } else {
        return false;
    }
    return true;
}

function validarAñoPublicacion(año) {

    const añoNumber = Number(año);
    if (isNaN(añoNumber)) return false;

    if (añoNumber < 1900 || añoNumber > 2025) {
        return false;
    }
    return true;
}

function validarcopiasDisponibles(copias) {
    const copiasDisponibles = Number(copias);
    if (isNaN(copiasDisponibles)) return false;

    if (copiasDisponibles < 1 || copiasDisponibles > 10) {
        return false;
    }
    return true;
}