'use strict';

export function isValid(tarea){
    const tituloLimpio = tarea.titulo.trim();
    const descripcionLimpio = tarea.descripcion.trim();
    let errores = [];
    if (!validTittle(tituloLimpio)){
        errores.push("El titulo tiene que tener mas de 3 caracteres");
    }

    if (!validDescription(descripcionLimpio)){
        errores.push("La descripcion tiene que tener mas de 3 caracteres");
    }


    if (errores.length === 0){
        return true;
    }else{
        return errores;
    }
    

}

function validTittle(titulo){

    if (titulo.length <= 3){
        return false;
    }

    return true;
}

function validDescription(descripcion){
    

    if (descripcion.length <= 3){
        return false;
    }

    return true;
}