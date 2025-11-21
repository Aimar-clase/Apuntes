'use strict';

import { loginManager } from "./pattern/loginManager.js";

const login = new loginManager();

document.addEventListener("DOMContentLoaded", function(){
    
    if (window.location.pathname === "/login.html"){
        if (login.checkUsersExist() !== true){
            document.location.href = "register.html"
        }
    }
    
})