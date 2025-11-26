
'use strict';

export class Filtro {

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    filtrarTarea(estado, prioridad, tareas) {
        return this.strategy.filtro(estado, prioridad, tareas);

    }
}

export class FiltrarPorEstado {
    filtro(estado, prioridad, tareas) {
        return tareas.filter(tarea => {
            const coincideEstado = tarea.hecho.includes(estado);
            return coincideEstado;
        })
    }
}

export class FiltrarPorPrioridad {
    filtro(estado, prioridad, tareas) {
        return tareas.filter(tarea => {
            const coincidePrioridad = tarea.prioridad.includes(prioridad);
            return coincidePrioridad;
        })
    }

}

export class FiltrarPorEstadoYPrioridad {
    filtro(estado, prioridad, tareas) {
        return tareas.filter(tarea => {
            const coincideEstado = tarea.hecho.includes(estado);
            const coincidePrioridad = tarea.prioridad.includes(prioridad);
            return coincideEstado && coincidePrioridad;
        });
    }
}