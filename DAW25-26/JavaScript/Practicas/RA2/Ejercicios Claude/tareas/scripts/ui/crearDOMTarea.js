export function crearDomTarea() {
    let seccionTareas = document.getElementById("seccion-tareas");
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    if (!seccionTareas) {
        seccionTareas = document.createElement("section");
        seccionTareas.id = "seccion-tareas";
        document.body.appendChild(seccionTareas);
    }

    let ulTareas = seccionTareas.querySelector("ul");
    if (!ulTareas) {
        ulTareas = document.createElement("ul");
        seccionTareas.appendChild(ulTareas);
    }



    tareas.forEach((tarea, index) => {
        const liTarea = document.createElement("li");
        liTarea.classList.add("tarea", `prioridad-${tarea.prioridad}`);

        const tituloTarea = document.createElement("h2");
        tituloTarea.textContent = tarea.titulo;

        const descripcionTarea = document.createElement("p");
        descripcionTarea.textContent = tarea.descripcion;

        const prioridadTarea = document.createElement("p");
        prioridadTarea.textContent = `Prioridad: ${tarea.prioridad}`;

        const checkCompleted = document.createElement("input");
        checkCompleted.type = "checkbox";
        checkCompleted.addEventListener("change", () => {
            tarea.completada = checkCompleted.checked;
            localStorage.setItem("tareas", JSON.stringify(tareas));
            liTarea.classList.toggle("completed", checkCompleted.checked);
        });

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Borrar";
        btnDelete.addEventListener("click", () => {
            tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            liTarea.remove();
        });

        liTarea.append(tituloTarea, descripcionTarea, prioridadTarea, checkCompleted, btnDelete);
        ulTareas.appendChild(liTarea);
    });
}
