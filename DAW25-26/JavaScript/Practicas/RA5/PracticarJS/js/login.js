'use strict';

import { LoginManager } from "./patterns/LoginManager.js";

const login = new LoginManager();
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", function () {
    login.checkIfUserExist();
});



