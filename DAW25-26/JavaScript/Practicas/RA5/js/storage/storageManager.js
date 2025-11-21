'use strict';
export class storageManager {

static getValuesFromLogin() {
    const usuario = document.getElementById("usuario");
    const passwd = document.getElementById("passwd");
    return {usuario , passwd}
}

static getValuesFromRegister(){
    const usuario = document.getElementById("usuario");
    const passwd = document.getElementById("passwd");
}

static userExist(){
    
    if (localStorage.getItem('usuarios') != null){
        return true;
    }
    return false;
}







}