'use strict';

import { TaskManager } from "./patterns/task-manager.js";



const btnSubmit = document.getElementById("btnSubmitTarea");

btnSubmit.addEventListener("click", TaskManager.addTask);

document.addEventListener("DOMContentLoaded", function(){
    TaskManager.renderDOM();
});