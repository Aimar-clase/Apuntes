// singleton
'use strict';

export class TaskManager {

    constructor() {
        if (TaskManager.instancia) return TaskManager.instancia;
        TaskManager.instancia = this;
    }

}