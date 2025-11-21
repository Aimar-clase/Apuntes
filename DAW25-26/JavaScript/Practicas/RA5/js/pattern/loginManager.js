'use strict';

import { storageManager } from "../storage/storageManager.js";

export class loginManager {
    constructor(){
        if (loginManager.instancia) return loginManager.instancia
        loginManager.instancia = this
    }

    checkUsersExist(){
        return storageManager.userExist();     
    }
    // checkLogin(){
        
    // }

}