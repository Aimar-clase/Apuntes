'use strict';

import { TaskManager } from "./patterns/task-manager.js";

const btnSubmit = document.getElementById("btnSubmit");
const gestor = new TaskManager();


btnSubmit.addEventListener("click", function () {
    gestor.addTask();
});

document.addEventListener("DOMContentLoaded", function () {
    gestor.renderTaskList();
});
